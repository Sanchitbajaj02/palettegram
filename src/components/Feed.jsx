import React from "react";
import logo from "../logo.svg";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
const Feed = () => {
  return (
    <main class="flex w-full px-20 py-6 h-[85vh] gap-2 ">
      <div class="max-w-40 max-h-24">
        <img class="w-10 h-10" src={logo} alt="logo" />
        <img class="w-10 h-10" src={logo} alt="settings" />
      </div>
      <div class="flex flex-[10] border  border-green-400">
        <div class=" flex-[3] overflow-y-scroll [&::-webkit-scrollbar]:hidden border border-yellow-300">
          <CreatePost />
          <Posts />
        </div>
        <div class="flex-[1]">Hello</div>
      </div>
    </main>
  );
};
export default Feed;
