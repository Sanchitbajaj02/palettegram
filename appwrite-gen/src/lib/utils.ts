import { readFileSync } from "fs";
import { Data, Schema } from "./types";

export const getSchemaFromFile = () => {
  const fileContent = readFileSync("schema.json", { encoding: "utf-8" });
  const schema: Schema = JSON.parse(fileContent);
  return schema;
};
