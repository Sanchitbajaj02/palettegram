export type PostInstanceType = {
  userId: string;
  postTitle: string;
  postImage: string[];
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
