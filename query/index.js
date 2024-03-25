import express from "express"
import cors from "cors"
import axios from "axios"
import amqp from "amqplib"

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const posts = {}

let connection, channel;

const handleEvents = (type,data) => {
  if (type == "PostCreated") {
    const { id, title } = data
    posts[id]={id,title,comments:[]}
}
if (type == "CommentCreated") {
    const { id, content, postId,status } = data
    const post = posts[postId]
    post?.comments?.push({id,content,status})
}
if (type == "CommentModerated") {
console.log("update");
const { id, status, postId, content } = data
const post = posts[postId]
const comment = post?.comments?.find(comment => comment.id == id)
comment.status = status
comment.content=content
}
}

async function connect() {
  try {
    const amqpServer = "amqp://rabbitmq-service";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertExchange("posts_exchange", "direct");

    const q = await channel.assertQueue("query_queue");
    await channel.bindQueue(q.queue, "posts_exchange", "post_created");
    await channel.bindQueue(q.queue, "posts_exchange", "comment_created");
    await channel.bindQueue(q.queue, "posts_exchange", "comment_moderated");

    channel.consume(q.queue, (msg) => {
      const { type, data } = JSON.parse(msg.content.toString());
      console.log("Received message:", type, data);
      handleEvents(type, data);
      channel.ack(msg);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

connect();

app.get("/posts", (req, res) => {
  res.send(posts)
})

app.listen(4002, async() => {
  console.log("Server connected")
}
)