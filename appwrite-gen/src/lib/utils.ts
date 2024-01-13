import { readFileSync } from "fs";
import { Data, Schema } from "./types";

export const getDataFromFile = () => {
  const fileContent = readFileSync("data.json", { encoding: "utf-8" });
  const data: Data = JSON.parse(fileContent);
  return data;
};

export const getSchemaFromFile = () => {
  const fileContent = readFileSync("schema.json", { encoding: "utf-8" });
  const schema: Schema = JSON.parse(fileContent);
  return schema;
};
