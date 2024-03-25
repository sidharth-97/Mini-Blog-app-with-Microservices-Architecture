const express = require("express")
const bodyParser=require("body-parser")
const { randomBytes } = require('crypto')
const cors = require("cors")
const axios = require("axios")
const amqp=require("amqplib")

const app = express()
app.use(bodyParser.json())
app.use(cors())

let connection, channel;
const posts = {}

async function connect() {
    try {
      const amqpServer = "amqp://rabbitmq-service";
      connection = await amqp.connect(amqpServer);
      channel = await connection.createChannel();
      await channel.assertExchange("posts_exchange", "direct", { durable: true }); 
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  app.post("/posts/create", async (req, res) => {
    try {
      if (!channel) {
        await connect();
      }
  
      const id = randomBytes(4).toString("hex");
      const { title } = req.body;
      posts[id] = { id, title };
  
      await channel.publish(
        "posts_exchange",
        "post_created", 
        Buffer.from(
          JSON.stringify({
            type: "PostCreated",
            data: { id, title },
          })
        )
      );
  
      res.status(201).send(posts[id]);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error creating post");
    }
  });

app.listen(4000, () => {
    console.log("Server running on port 4000..");
})