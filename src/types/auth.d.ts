export type verificationResponseType = {
  status: boolean;
  data: any;
};

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
  data: userCollectionDB | {};
  error: boolean;
  loading: boolean;
};
