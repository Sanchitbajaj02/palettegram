import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsReducer";
import registerReducer from "../features/register/registerReducer";

export default configureStore({
  reducer: {
    posts: postsReducer,
    register: registerReducer,
  },
});
