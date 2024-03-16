import React, { useState } from 'react'
import axios from "axios"

const CreateComment = ({postId}) => {
    const [content, setContent] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        async function fetch() {
           await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content })
        }
        fetch()
        setContent("")
    }
  return (
      <div>
          <h1>New Comment</h1>
          <form > 
            <input onChange={(e) => setContent(e.target.value)} type="text"/>      
            <button onClick={handleSubmit}>Submit</button>
          </form>
    </div>
  )
}

export default CreateComment