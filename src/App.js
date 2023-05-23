import "./Styles/App.css";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Home from "./components/Home";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
