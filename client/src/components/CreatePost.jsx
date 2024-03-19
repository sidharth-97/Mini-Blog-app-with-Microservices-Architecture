import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://posts.com/posts/create", { title });
    setTitle("");
  };
  return (
    <div className="border p-10 w-full flex flex-col justify-center items-center">
      <div className="w-96 flex flex-col gap-3">
        <h1 className="text-2xl">Create a post</h1>
        <div className="">
          <form onSubmit={handleSubmit} className="">
            <div className="flex flex-col">
              <textarea
                className="border"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                className="bg-black text-white p-1 rounded-md mt-2"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
