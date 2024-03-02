import {
  db,
  storage,
  ID,
  Query,
  palettegramDB,
  usersCollection,
  userBucketStorage,
} from "./appwrite.config";

/**
 * @description get image url from bucket
 * @param imageId
 * @returns
 */
const getUserImageUrl = (imageId: string) => {
  try {
    if (!imageId) {
      throw new Error("Image ID is required");
    }

    const url = `https://cloud.appwrite.io/v1/storage/buckets/${userBucketStorage}/files/${imageId}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`;

    return url;
  } catch (error) {
    console.log(error);
  }
};

const getUserFieldByAccountId = async (userId: string) => {
  try {
    const resp = await db.listDocuments(palettegramDB, usersCollection, [
      Query.search("accountId", userId),
    ]);
    if (!resp) throw new Error("Failed to update user details");
    return resp;
  } catch (error) {
    console.log(error);
  }
};

const saveImage = async (image: File) => {
  try {
    const resp = await storage.createFile(userBucketStorage, ID.unique(), image);
    if (!resp) {
      console.log(resp);
      throw new Error("Photo cannot be uploaded");
    }
    return resp;
  } catch (error) {
    console.log(error);
  }
};

const updateImageURL = async (userId: string, image: string, isBanner: boolean) => {
  try {
    const resp = await getUserFieldByAccountId(userId);
    let docId = resp?.documents[0].$id;
    if (isBanner) {
      const resp = await db.updateDocument(palettegramDB, usersCollection, docId!, {
        bannerURL: image,
      });
      if (resp) {
        return resp;
      }
    } else {
      const resp = await db.updateDocument(palettegramDB, usersCollection, docId!, {
        avatarURL: image,
      });
      if (resp) {
        return resp;
      }
    }
  } catch (error: any) {
    console.log(error);
  }
};

const updateUserDetail = async (
  userId: string,
  {
    fullName,
    about,
    profession,
    location,
    userlink,
  }: { fullName: string; about: string; profession: string; location: string; userlink: string },
) => {
  const userField = await getUserFieldByAccountId(userId);
  let docId = userField?.documents[0].$id;
  /*   const { fullName, about, profession, location, userlink } = data
   */ try {
    const resp = await db.updateDocument(palettegramDB, usersCollection, docId!, {
      fullName: fullName,
      about: about,
      location: location,
      userLink: userlink,
      profession: profession,
    });
    if (!resp) throw new Error();
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export { saveImage, updateImageURL, updateUserDetail, getUserImageUrl };
