export type verificationResponseType = {
  status: boolean;
  data: any;
};

export type userCollectionDB = {
  email: string;
  fullName: string;
  isVerified: boolean;
  accountId: string;
  username: string;
  $id: string;
  $createdAt: Date;
  $updatedAt: Date;
  avatarURL?: string;
  bannerURL?: string;
  about?: string;
  userLink?: string;
};

export type authDetails = {
  creds: {
    accountId: string;
    email: string;
    createdAt: string;
    isVerified: boolean;
  };
  error: boolean;
  loading: boolean;
};

export type userDetails = {
  data: userCollectionDB | {};
  error: boolean;
  loading: boolean;
};
