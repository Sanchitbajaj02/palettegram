import { Databases, Storage } from "node-appwrite";
import client from "./lib/client";
import { Schema } from "./lib/types";
import { readFileSync, writeFileSync } from "fs";

const database = new Databases(client);
const storage = new Storage(client);

const getSchema = async () => {
  const schema: Schema = { databases: [], collections: [], buckets: [] };

  schema.databases = (await database.list()).databases;
  schema.buckets = (await storage.listBuckets()).buckets;

  for (const db of schema.databases) {
    const dbCollections = (await database.listCollections(db.$id)).collections;
    schema.collections.push(...dbCollections);
  }

  return schema;
};

const writeSchemaToFile = async () => {
  const schema = await getSchema();
  writeFileSync("schema.json", JSON.stringify(schema, null, 2), { encoding: "utf-8" });
};

writeSchemaToFile();
