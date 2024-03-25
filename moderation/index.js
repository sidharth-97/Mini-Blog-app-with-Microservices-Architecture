import amqp from "amqplib";
import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

let connection, channel;

async function connect() {
  try {
    const amqpServer = "amqp://rabbitmq-service";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertExchange("posts_exchange", "direct");

    const q = await channel.assertQueue("moderated_queue");
    await channel.bindQueue(q.queue, "posts_exchange", "comment_created");

    channel.consume(q.queue, (msg) => {
      const { type, data } = JSON.parse(msg.content.toString());

      if (type === "CommentCreated") {
        const status = data.content.includes("react") ? "rejected" : "approved";
        console.log("Moderation status:", status);

        channel.publish(
          "posts_exchange",
          "comment_moderated", 
          Buffer.from(
            JSON.stringify({
              type: "CommentModerated",
              data: { ...data, status },
            })
          ),
          { contentType: "application/json" }
        );
      }
      channel.ack(msg);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

connect();

console.log("Moderation service started");
app.listen(4003,()=>console.log("Server connected"))