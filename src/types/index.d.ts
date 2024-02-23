// export type PostInstanceType = {
//   accountId: string;
//   postTitle: string;
//   postImages: string[];
//   colors?: string | null;
//   comments?: string[];
//   likes: string[];
//   isActive: boolean;
//   $id?: string;
//   $collectionId?: string;
//   $createdAt?: string;
// };

import { userCollectionDB } from "./auth";

export type PostInstanceType = {
  userId: any;
  postTitle: string;
  postImages: string[];
  colors?: string | null;
  commentsCount?: number;
  likesCount: number;
  isActive: boolean;
  $id?: string;
  $collectionId?: string;
  $createdAt?: string;
};

export type PostInitStateType = {
  posts: PostInstanceType[];
  error: boolean;
  loading: boolean;
};

export type Bookmark = {
  accountId: string;
  bookmark: string[];
};

export type BookmarkInitType = {
  data: Bookmark[];
  error: boolean;
  loading: boolean;
};

export type UserFromDB = {
  documents: [
    {
      accountId: string;
      username: string;
      fullName: string;
      email: string;
      isVerified: boolean;
      about: string | null;
      userLink: string | null;
      avatarURL: string | null;
      bannerURL: string | null;
      createdAt: Date;
      updatedAt: Date;
    },
  ];
};

export type FormatOnType = "seconds" | "minutes" | "hours" | "days";
export type UserBookMarkType = {
  userId: string;
  postId: string[] | undefined;
  error: boolean;
  loading: boolean;
};
