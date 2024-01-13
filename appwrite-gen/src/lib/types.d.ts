import { Models } from "node-appwrite";

export type Schema = {
  databases: Models.Database[];
  collections: Models.Collection[];
  buckets: Models.Bucket[];
};

export type Data = {
  documents: Models.Document[];
  files: Models.File[];
};
