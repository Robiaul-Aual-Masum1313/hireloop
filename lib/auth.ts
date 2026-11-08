import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_CLIENT as string);
const db = client.db('hireloop');

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      role: {
        type: ["Seeker", "Recruiter", "Admin"],
        required: false,
        defaultValue: "Seeker",
        input: true,
      },
    },
  },
});