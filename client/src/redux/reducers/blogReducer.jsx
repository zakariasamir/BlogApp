const initialState = {
  posts: [],
  loading: true,
  error: {},
};

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case "UPDATE_POST":
      const { postId, updatedData } = action.payload;
      // Find the index of the blog post to update
      const index = state.posts.findIndex((blog) => blog._id === postId);
      // Create a new array with the updated blog post
      const updatedBlogs = [...state.posts];
      updatedBlogs[index] = { ...updatedBlogs[index], ...updatedData };
      return {
        ...state,
        blogs: updatedBlogs,
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    case "SET_CURRENT_BLOG":
      return {
        ...state,
        currentBlog: action.payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}
