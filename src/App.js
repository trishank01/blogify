import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import { UserContextProvider } from "./context/UserContext";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/create" element={<CreatePost />}></Route>
        <Route path="/post/:id" element={<PostDetails />}></Route>
        <Route path="/edit/:id" element={<EditPost />}></Route>
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
