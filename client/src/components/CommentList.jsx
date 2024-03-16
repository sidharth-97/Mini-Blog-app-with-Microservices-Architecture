import React, { useEffect, useState } from 'react'
import axios from "axios"
import CreateComment from './CreateComment'

const Listcomments = ({postId}) => {
    const [comments, setComments] = useState([])
    useEffect(() => {
        async function fetch(){
            const response = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
            if (response.data) {
                setComments(response.data)
            }
        }

        fetch()
        console.log(comments);
    },[])
  return (
      <div className='flex gap-3'>
          <ul>
                {
              comments?.map((comment) => {
                  return <li>{comment?.content}</li>
              })
        }
          </ul>
        
    </div>
  )
}

export default Listcomments