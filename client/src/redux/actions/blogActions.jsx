import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

export const getPosts = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  try {
    const res = await axios.get("http://localhost:3000/posts");
    dispatch({
      type: "GET_POSTS",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addPost = (postData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  try {
    const res = await axios.post("http://localhost:3000/posts", postData);
    dispatch({
      type: "ADD_POST",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};
export const updatePost = (postId, updatedFormData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  try {
    const res = await axios.put(
      `http://localhost:3000/posts/${postId}`,
      updatedFormData
    );
    dispatch({
      type: "UPDATE_POST",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};
export const deletePost = (postId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  try {
    await axios.delete(`http://localhost:3000/posts/${postId}`);
    dispatch({
      type: "DELETE_POST",
      payload: postId,
    });
  } catch (err) {
    console.error(err);
  }
};
export const setCurrentBlog = (blogData) => {
  return {
    type: "SET_CURRENT_BLOG",
    payload: blogData,
  };
};
export const destroy = () => ({
  type: "LOGOUT",
});
