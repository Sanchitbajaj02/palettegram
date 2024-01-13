import { Databases, Storage } from "node-appwrite";
import client from "./lib/client";
import { Data, Schema } from "./lib/types";
import { readFileSync, writeFileSync } from "fs";
import { getSchemaFromFile } from "./lib/utils";

const database = new Databases(client);
const storage = new Storage(client);

const getData = async (schema: Schema) => {
  const data: Data = { documents: [], files: [] };

  for (const db of schema.databases) {
    for (const collection of schema.collections) {
      data.documents = (await database.listDocuments(db.$id, collection.$id)).documents;
    }
  }

  for (const bucket of schema.buckets) {
    data.files = (await storage.listFiles(bucket.$id)).files;
  }

  return data;
};

const writeDataToFile = async () => {
  const schema: Schema = getSchemaFromFile();
  const data = await getData(schema);

  writeFileSync("data.json", JSON.stringify(data, null, 2), { encoding: "utf-8" });
};

writeDataToFile();
