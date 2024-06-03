export type userCollectionDB = {
  $id: string;
  accountId: string;
  email: string;
  fullName: string;
  username: string;
  isVerified: boolean;
  avatarURL?: string;
  bannerURL?: string;
  about?: string;
  userLink?: string;
  location?: string;
  profession?: string;
  $createdAt: string;
  $updatedAt: string;
};

// export type authDetails = {
//   creds: {
//     accountId: string;
//     email: string;
//     createdAt: string;
//     isVerified: boolean;
//   };
//   error: boolean;
//   loading: boolean;
// };

export type userDetails = {
  data: userCollectionDB | unknown;
  error: boolean;
  loading: boolean;
<<<<<<< HEAD
  accountId?: string;
=======
  accountId?: string
>>>>>>> e0009acdd7d8b44cec537c9b3052443795b517eb
};

export enum LoginOptions {
  REGISTER,
  LOGIN,
}
