import React, { useEffect, useState } from 'react'
import axios from "axios"
import CreateComment from './CreateComment'
import Listcomments from './CommentList'

const ListPosts = () => {
    const [posts, setPosts] = useState({})
    useEffect(() => {
        async function fetch(){
            const response = await axios.get("http://posts.com/posts")
            setPosts(response.data)
        }
        fetch()
        console.log(posts);
    },[])
  return (
      <div className='flex gap-3 flex-col w-full text-center p-5'>
          <h1 className='text-xl underline'>List of Posts</h1>
          <div className='text-left items-center flex flex-col gap-2'>
          {
              Object.values(posts).map((item) => <div className='flex w-1/2'>
                  <div className='p-3 border rounded-md'>
                  <h1 className='mt-1'>{item.title}</h1>
                      <CreateComment postId={item.id}/>
                      <Listcomments comments={item.comments}/>
                  </div>
              </div>)
          }
        </div>
    </div>
  )
}

export default ListPosts