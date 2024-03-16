import React, { useEffect, useState } from 'react'
import axios from "axios"
import CreateComment from './CreateComment'
import Listcomments from './CommentList'

const ListPosts = () => {
    const [posts, setPosts] = useState({})
    useEffect(() => {
        async function fetch(){
            const response = await axios.get("http://localhost:4002/posts")
            setPosts(response.data)
        }
        fetch()
        console.log(posts);
    },[])
  return (
      <div className='flex gap-3'>
          {
              Object.values(posts).map((item) => <div className='flex'>
                  <div className='p-3 border'>
                      <h1>{item.title}</h1>
                      <Listcomments comments={item.comments}/>
                      <CreateComment postId={item.id}/>
                  </div>
              </div>)
          }
    </div>
  )
}

export default ListPosts