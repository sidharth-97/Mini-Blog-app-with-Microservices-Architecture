const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const axios =require("axios")
const amqp=require("amqplib")

const { randomBytes }=require('crypto')

const app = express()
app.use(bodyParser.json())
app.use(cors())


let connection, channel;
const commentsByPostId = {};

async function connect() {
  try {
    const amqpServer = "amqp://rabbitmq-service";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertExchange("posts_exchange", "direct"); 
  } catch (error) {
    console.log(error);
    throw error;
  }
}

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  try {
    if (!channel) {
      await connect();
    }

    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;
    const postId = req.params.id;

    const comments = commentsByPostId[postId] || [];
    comments.push({ id: commentId, content, status: "pending" });
    commentsByPostId[postId] = comments;

    await channel.publish(
      "posts_exchange", 
      "comment_created", 
      Buffer.from(
        JSON.stringify({
          type: "CommentCreated",
          data: { id: commentId, content, postId, status: "pending" },
        })
      ),
      { contentType: "application/json" }
    );

    res.status(201).send(comments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating comment");
  }
});

app.listen(4001, () => {
    console.log("server running on port 4001")
})