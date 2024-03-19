import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const handleSubmit = async(e) => {
    e.preventDefault()
    await axios.post("http://posts.com/posts/create", {title})
    setTitle("")
  }
  return (
    <div className="border p-10 w-96">
      <h1>Create a post</h1>
      <div className="">
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col">
                 <input className="border" value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <button className="bg-black text-white p-1 rounded-md mt-2" type="submit">Submit</button>
          </div>
   
      </form>
      </div>
   
    </div>
  );
};

export default CreatePost;
