import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";

const Listcomments = ({ comments }) => {
  return (
    <div className="flex gap-3">
      <ul>
        {comments?.map((comment) => {
          let content
          if (comment.status == "approved") {
            content=comment.content
          }
          if (comment.status == "pending") {
            content="Waiting for approval"
          }
          if (comment.status == "rejected") {
            content="Rejected the comment"
          }
          return <li>{content}</li>;
        })}
      </ul>
    </div>
  );
};

export default Listcomments;
