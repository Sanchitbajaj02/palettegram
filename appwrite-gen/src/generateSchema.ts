import { Databases, Storage } from "node-appwrite";
import { databases, storage } from "./lib/client";
import { Schema } from "./lib/types";
import { readFileSync, writeFileSync } from "fs";

const getSchema = async () => {
  const schema: Schema = { databases: [], collections: [], buckets: [] };

  schema.databases = (await databases.list()).databases;
  schema.buckets = (await storage.listBuckets()).buckets;

  for (const db of schema.databases) {
    const dbCollections = (await databases.listCollections(db.$id)).collections;
    schema.collections.push(...dbCollections);
  }

  return schema;
};

const writeSchemaToFile = async () => {
  const schema = await getSchema();
  writeFileSync("schema.json", JSON.stringify(schema, null, 2), { encoding: "utf-8" });
};

writeSchemaToFile();
