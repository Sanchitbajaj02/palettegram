import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Home from "./components/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import Register from "./components/Auth/Register";
import Verification from "./components/Auth/Verification";
import Login from "./components/Auth/Login";
import PostProfilePage from "./components/PostProfilePage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
        <Route
          path="/user/:userId"
          element={
            <>
              <Navbar />
              <UserProfile />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
