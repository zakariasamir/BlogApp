import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import { Route, Routes} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAppContext } from "./components/Context";
import Home from "./components/Home";
import CreateBlog from "./components/CreateBlog";
import UpdateBlog from "./components/UpdateBlog";

function App() {
  let links = [
    {
      id: 1,
      title: "Home",
      link: "/",
    },
    // {
    //   id: 2,
    //   title: "Blog",
    //   link: "/blog",
    // },
    {
      id: 3,
      title: "Create Blog",
      link: "/CreateBlog",
    },
    {
      id: 4,
      title: "Contact",
      link: "/contact",
    },
  ];
  const { darkMode, setDarkMode } = useAppContext();

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header title={links.title} links={links} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createBlog" element={<CreateBlog />} />
        <Route path="/update/:id" element={<UpdateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
