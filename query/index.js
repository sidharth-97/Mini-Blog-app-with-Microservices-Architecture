import express from "express"
import cors from "cors"
import axios from "axios"

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const posts = {}

const handleEvents = (type,data) => {
  if (type == "PostCreated") {
    const { id, title } = data
    posts[id]={id,title,comments:[]}
}
if (type == "CommentCreated") {
    const { id, content, postId,status } = data
    const post = posts[postId]
    post.comments.push({id,content,status})
}
if (type == "CommentUpdated") {
console.log("update");
const { id, status, postId, content } = data
const post = posts[postId]
const comment = post.comments.find(comment => comment.id == id)
comment.status = status
comment.content=content
}
}

app.get("/posts", (req, res) => {
  res.send(posts)
})

app.post("/events", (req, res) => {
      const { type, data } = req.body
   handleEvents(type,data)
  console.log(posts);
    res.send({})
})

app.listen(4002, async() => {
  console.log("Server connected")
  const res = await axios.get("http://localhost:4005/events")
  for (let event of res.data) {
    handleEvents(event.type,event.data)
  }
}
)