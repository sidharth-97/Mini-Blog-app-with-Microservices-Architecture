import express from "express"
import cors from "cors"
import axios from "axios"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.post("/events", async(req, res) => {
    const { type, data } = req.body
    if (type == "CommentCreated") {
        const status = data.content.includes("react") ? "rejected" : "approved";
        console.log(status);
        try {
             await axios.post("http://localhost:4005/events", {
            type: "CommentModarated",
            data: {
                id: data.id,
                content: data.content,
                status,
                postId:data.postId
            }
        })
        } catch (error) {
            console.log(error?.message);
        }
       
    }
    res.send({})
})


app.listen(4003,()=>console.log("Server connected"))