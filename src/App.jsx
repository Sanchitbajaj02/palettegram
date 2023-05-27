import "./Styles/App.css";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Home from "./components/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostProfilePage from "./components/PostProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
