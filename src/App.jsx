import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Home from "./components/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostProfilePage from "./components/PostProfilePage";
import Register from "./components/Auth/Register";
import Verification from "./components/Auth/Verification";
import Login from "./components/Auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verification />} />
        <Route
          path="/feed"
          element={
            <>
              <Navbar />
              <Feed />
            </>
          }
        />
        <Route
          path="/post/:id"
          element={
            <>
              <Navbar />
              <PostProfilePage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
