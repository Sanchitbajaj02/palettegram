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
const getUserImageUrl = (imageId: string, bucketId: string): string => {
  try {
    if (!imageId) {
      throw new Error("Image ID is required");
    }

    const url = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${imageId}/view?project=${String(
      process.env.NEXT_PUBLIC_PROJECT_ID,
    )}`;

    return url;
  } catch (error) {
    console.log(error);
  }
  return "";
};

const saveImage = async (image: File) => {
  try {
    if (!image) {
      throw new Error("error aa rha hai");
    }

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
    console.log(image);

    if (isBanner) {
      const result01 = await db.updateDocument(palettegramDB, usersCollection, userId, {
        bannerURL: image,
      });
      if (!result01) {
        throw new Error("Error in updating user image");
      }
      return result01;
    } else {
      const result02 = await db.updateDocument(palettegramDB, usersCollection, userId, {
        avatarURL: image,
      });
      if (!result02) {
        throw new Error("Error in updating user image");
      }
      return result02;
    }
  } catch (error: any) {
    console.log(error);
  }
  return null;
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
  try {
    const resp = await db.updateDocument(palettegramDB, usersCollection, userId!, {
      fullName: fullName,
      about: about,
      location: location,
      userLink: userlink,
      profession: profession,
    });
    if (!resp) throw new Error("Failed to retrieve data");
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export { saveImage, updateImageURL, updateUserDetail, getUserImageUrl };
