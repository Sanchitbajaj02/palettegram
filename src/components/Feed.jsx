import React from "react";
import logo from "../logo.svg";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
const Feed = () => {
  return (
    <main class="flex w-full px-20 h-[90vh] border">
      <div class="max-w-40 max-h-24 border border-red-500">
        <img class="w-10 h-10" src={logo} alt="logo" />
        <img class="w-10 h-10" src={logo} alt="settings" />
      </div>
      <div class="flex flex-[10] gap-2">
        <div class=" flex-[3] border border-blue-600  overflow-y-scroll">
          <CreatePost />
          <Posts />
        </div>
        <div class="flex-[1] border border-yellow-300">Hello</div>
      </div>
    </main>
  );
};
export default Feed;
