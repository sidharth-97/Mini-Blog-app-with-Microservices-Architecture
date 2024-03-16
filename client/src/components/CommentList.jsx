import React, { useEffect, useState } from 'react'
import axios from "axios"
import CreateComment from './CreateComment'

const Listcomments = ({comments}) => {
 
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