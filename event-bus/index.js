import express, { urlencoded } from "express"
import axios from "axios"
import cors from "cors"

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded())

const events=[]

app.post("/events", async(req, res) => {
    const event = req.body
    events.push(event)
    console.log(event);
    try {
    await axios.post("http://posts-clusterip-srv:4000/events", event)
    await axios.post("http://comments-srv:4001/events", event)
    await axios.post("http://query-srv:4002/events", event)
    await axios.post("http://moderation-srv:4003/events", event)
    } catch (error) {
        console.log(error?.message);
    }

    res.send({status:200})
}) 
app.get("/events", (req, res) => {
    res.send(events)
})

app.listen(4005,()=>console.log("server running"))