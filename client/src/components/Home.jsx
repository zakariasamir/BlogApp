import { useEffect } from "react";
import Blog from "./Blog";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux/actions/blogActions";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blog.posts || []); // Provide default empty array

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const renderBlog = () => {
    if (!Array.isArray(posts)) {
      return <p>Error loading posts</p>;
    }
    return posts.map((blog) => <Blog key={blog._id} blog={blog} />);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-10 z-20 start-0 border-gray-200 dark:border-gray-600">
      <section>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-10 justify-between">
          {Array.isArray(posts) && posts.length > 0 ? (
            renderBlog()
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
