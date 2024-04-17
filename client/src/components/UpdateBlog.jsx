import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../redux/actions/blogActions";
import { useNavigate } from "react-router-dom";

const UpdateBlog = ({ match }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const currentBlog = useSelector((state) => state.blog.currentBlog);
  console.log("updated blog :", currentBlog);
  useEffect(() => {
    if (currentBlog) {
      setTitle(currentBlog.title || "");
      setContent(currentBlog.content || "");
      setCategory(currentBlog.category || "");
      // setImage(currentBlog.image || null);
    }
  }, [currentBlog]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      alert("Please fill in all fields");
      return;
    }

    const updatedFormData = new FormData();
    updatedFormData.append("title", title);
    updatedFormData.append("category", category);
    updatedFormData.append("content", content);
    updatedFormData.append("image", image);
    // const updatedBlog = {
    //   title,
    //   category,
    //   content,
    //   image,
    // };

    dispatch(updatePost(currentBlog._id, updatedFormData));

    setTitle("");
    setContent("");
    setCategory("");
    setImage("");
    // Navigate("/");
  };

  return (
    <div>
      <main>
        <div className="min-h-screen bg-white dark:bg-gray-900 p-10 z-20 start-0 border-gray-200 dark:border-gray-600">
          <section>
            <form className="max-w-sm mx-auto">
              <div>
                <label
                  htmlFor="small-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="base-input"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div>
              <form class="max-w-sm mx-auto">
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Choose a Category
                </label>
                <select
                  id="Categorys"
                  onChange={(e) => setCategory(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="Technology" selected>
                    Technology
                  </option>
                  <option value="Fitness">Fitness</option>
                  <option value="Health">Health</option>
                </select>
              </form>
              <div className="mb-5">
                <label
                  htmlFor="large-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Content
                </label>
                <input
                  type="text"
                  id="large-input"
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div>

              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="file_input"
              >
                Upload file
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
              <p
                class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                PNG or JPG.
              </p>

              <div className="flex items-center justify-center mb-5">
                <button
                  onClick={onSubmit}
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                >
                  Update
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
    // <div>
    //   <main>
    //     <div className="min-h-screen bg-white dark:bg-gray-900 p-10 z-20 start-0 border-gray-200 dark:border-gray-600">
    //       <section>
    //         <form className="max-w-sm mx-auto">
    //           <div>
    //             <label
    //               htmlFor="small-input"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Title
    //             </label>
    //             <input
    //               type="text"
    //               id="base-input"
    //               name="title"
    //               value={title}
    //               onChange={(e) => setTitle(e.target.value)}
    //               className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //             ></input>
    //           </div>
    //           <form class="max-w-sm mx-auto">
    //             <label
    //               for="category"
    //               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Choose a Category
    //             </label>
    //             <select
    //               id="Categorys"
    //               onChange={(e) => setCategory(e.target.value)}
    //               value={category}
    //               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //             >
    //               <option value="Technology">Technology</option>
    //               <option value="Fitness">Fitness</option>
    //               <option value="Health">Health</option>
    //             </select>
    //           </form>
    //           <div className="mb-5">
    //             <label
    //               htmlFor="large-input"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Content
    //             </label>
    //             <input
    //               type="text"
    //               id="large-input"
    //               name="content"
    //               value={content}
    //               onChange={(e) => setContent(e.target.value)}
    //               className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //             ></input>
    //           </div>
    //           <div className="flex items-center justify-center mb-5">
    //             <button
    //               onClick={onSubmit}
    //               type="submit"
    //               className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
    //             >
    //               Update
    //             </button>
    //           </div>
    //         </form>
    //       </section>
    //     </div>
    //   </main>
    // </div>
  );
};

export default UpdateBlog;
