import { Url } from "next/dist/shared/lib/router/router";

export type PostInstanceType = {
  accountId: string;
  postTitle: string;
  postImages: string[];
  colors?: string[];
  comments?: string[];
  likes: string[];
  $id?: string;
  $collectionId?: string;
  $createdAt?: string;
};

export type PostInitStateType = {
  posts: PostInstanceType[];
  error: boolean;
  loading: boolean;
};

export type userDetail = {
  creds: {
    userId: string;
    email: string;
    createdAt: string;
    isVerified: boolean;
  };
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
      accountId: string,
      username: string,
      fullName: string,
      email: string,
      isVerified: boolean,
      about: string | null,
      userLink: Url | null,
      avatarURL: Url | null,
      bannerURL: Url | null
      createdAt: Date,
      updatedAt: Date
    }
  ]
}
