import { Databases, Models, Storage } from "node-appwrite";
import {databases, storage} from "./lib/client";
import { Schema } from "./lib/types";
import { getSchemaFromFile } from "./lib/utils";

const createDatabases = async (schema: Schema) => {
  for (const db of schema.databases) {
    try {
      await databases.delete(db.$id);
      console.log(`Deleted and recreating database ${db.name} with ID ${db.$id}...`);
    } catch {
      console.log(`Creating Database "${db.name}"...`);
    }
    await databases.create(db.$id, db.name, db.enabled);
  }
};

const createCollections = async (schema: Schema) => {
  for (const collection of schema.collections) {
    try {
      await databases.deleteCollection(collection.databaseId, collection.$id);
      console.log(
        `Deleted and recreating collection ${collection.name} with ID ${collection.$id}...`,
      );
    } catch {
      console.log(`Creating Collection "${collection.name}"...`);
    }

    await databases.createCollection(
      collection.databaseId,
      collection.$id,
      collection.name,
      collection.$permissions,
      collection.documentSecurity,
      collection.enabled,
    );
    await createAttributesOfCollection(collection);
  }
};

const createAttributesOfCollection = async (
  // TODO: write typesafe attributes
  collection: Omit<Models.Collection, "attributes"> & { attributes: any },
) => {
  console.log(`Creating Attributes of "${collection.name}"...`);
  for (const attr of collection.attributes) {
    switch (attr.type) {
      case "string":
        switch (attr.format) {
          case "email":
            await databases.createEmailAttribute(
              collection.databaseId,
              collection.$id,
              attr.key,
              attr.required,
              attr.default,
              attr.array,
            );
            break;
          case "ip":
            await databases.createIpAttribute(
              collection.databaseId,
              collection.$id,
              attr.key,
              attr.required,
              attr.default,
              attr.array,
            );
            break;
          case "url":
            await databases.createUrlAttribute(
              collection.databaseId,
              collection.$id,
              attr.key,
              attr.required,
              attr.default,
              attr.array,
            );
            break;
          case "enum":
            await databases.createEnumAttribute(
              collection.databaseId,
              collection.$id,
              attr.key,
              attr.elements,
              attr.required,
              attr.default,
              attr.array,
            );
            break;
          default:
            await databases.createStringAttribute(
              collection.databaseId,
              collection.$id,
              attr.key,
              attr.size,
              attr.required,
              attr.default,
              attr.array,
            );
        }
        break;
      case "integer":
        await databases.createIntegerAttribute(
          collection.databaseId,
          collection.$id,
          attr.key,
          attr.required,
          attr.min,
          attr.max,
          attr.default,
          attr.array,
        );
        break;
      case "double":
        await databases.createFloatAttribute(
          collection.databaseId,
          collection.$id,
          attr.key,
          attr.required,
          attr.min,
          attr.max,
          attr.default,
          attr.array,
        );
        break;
      case "boolean":
        await databases.createBooleanAttribute(
          collection.databaseId,
          collection.$id,
          attr.key,
          attr.required,
          attr.default,
          attr.array,
        );
        break;
      case "datettime":
        await databases.createDatetimeAttribute(
          collection.databaseId,
          collection.$id,
          attr.key,
          attr.required,
          attr.default,
          attr.array,
        );
        break;
      case "relationship":
        await databases.createRelationshipAttribute(
          collection.databaseId,
          collection.$id,
          attr.relatedCollection,
          attr.relationType,
          attr.twoWay,
          attr.key,
          attr.twoWayKey,
          attr.onDelete,
        );
        break;
    }
  }
};

const createBuckets = async (schema: Schema) => {
  for (const bucket of schema.buckets) {
    try {
      await storage.deleteBucket(bucket.$id);
      console.log(`Deleted and recreating Bucket ${bucket.name}...`);
    } catch {
      console.log(`Creating Bucket ${bucket.name}...`);
    }
    await storage.createBucket(
      bucket.$id,
      bucket.name,
      bucket.$permissions,
      bucket.fileSecurity,
      bucket.enabled,
      bucket.maximumFileSize,
      bucket.allowedFileExtensions,
      bucket.compression,
      bucket.encryption,
      bucket.antivirus,
    );
  }
};

const prepareSchema = async () => {
  const schema = getSchemaFromFile();

  await createDatabases(schema);
  await createCollections(schema);
  await createBuckets(schema);
};

prepareSchema();
