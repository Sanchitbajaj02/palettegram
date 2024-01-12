import { Models } from "node-appwrite";

export type Schema = {
  databases: Models.Database[];
  collections: Models.Collection[];
  documents: Models.Document[];
};
