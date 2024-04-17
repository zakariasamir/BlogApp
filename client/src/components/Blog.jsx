import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePost, deletePost } from "../redux/actions/blogActions";
import { setCurrentBlog } from "../redux/actions/blogActions";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgUrl = "http://localhost:3000";

  const handleUpdate = (updatedData) => {
    dispatch(setCurrentBlog(updatedData)); // Dispatch action to store current blog data
    navigate(`/update/${blog._id}`); // Navigate to the update page
  };

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };
  return (
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img class="rounded-t-lg h-48" src={`${imgUrl}/${blog.image}`} alt="" />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {blog.title}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {blog.content}
        </p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {blog.category}
        </p>
      </div>
      <div className="flex justify-center pb-8">
        <button
          type="button"
          onClick={() => handleUpdate(blog)}
          className="text-white mr-5 bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => handleDelete(blog._id)}
          className="text-white mr-5 bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Blog;
