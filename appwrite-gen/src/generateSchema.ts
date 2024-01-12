import { Databases } from "node-appwrite";
import client from "./lib/client";
import { Schema } from "./lib/types";
import { writeFileSync } from "fs";

const database = new Databases(client);

const getSchema = async () => {
  const schema: Schema = { databases: [], collections: [], documents: [] };

  schema.databases = (await database.list()).databases;

  for (const db of schema.databases) {
    schema.collections = (await database.listCollections(db.$id)).collections;
    for (const collection of schema.collections) {
      schema.documents = (await database.listDocuments(db.$id, collection.$id)).documents;
    }
  }

  return schema;
};

const writeSchemaToFile = async () => {
  const schema = await getSchema();
  writeFileSync("schema.json", JSON.stringify(schema, null, 2), { encoding: "utf-8" });
};

writeSchemaToFile();

export { getSchema, writeSchemaToFile };
