import express, { urlencoded } from "express"
import axios from "axios"
import cors from "cors"

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded())

app.post("/events", async(req, res) => {
    const event = req.body
    await axios.post("http://localhost:4000/events", event)
    await axios.post("http://localhost:4001/events", event)
    await axios.post("http://localhost:4002/events", event)
    res.send({status:200})
}) 

app.listen(4005,()=>console.log("server running"))