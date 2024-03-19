import React, { useState } from 'react'
import axios from "axios"

const CreateComment = ({postId}) => {
    const [content, setContent] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        async function fetch() {
           await axios.post(`http://posts.com/posts/${postId}/comments`, { content })
        }
        fetch()
        setContent("")
    }
  return (
      <div className=' w-1/2 min-w-96'>
          <h1 className=' font-medium mb-1'>New Comment</h1>
          <form className='flex flex-col gap-1'> 
            <input className='border' onChange={(e) => setContent(e.target.value)} type="text"/>      
            <button className='bg-black text-white p-1 rounded-md' onClick={handleSubmit}>Submit</button>
          </form>
    </div>
  )
}

export default CreateComment