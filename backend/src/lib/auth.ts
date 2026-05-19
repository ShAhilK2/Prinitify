import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";
import { ENV } from "../config/env.config";
import { hash, verify } from "../utils/bcrypt";
import { openAPI, jwt } from "better-auth/plugins";

export const getAuth = () => {
  if (!mongoose.connection.db) {
    throw new Error(
      "Database connection establishment .Call connectDb() before using auth",
    );
  }

  return betterAuth({
    secret: ENV.BETTER_AUTH_SECRET,
    baseURL: ENV.BETTER_AUTH_URL,
    trustedOrigins: [ENV.FRONTEND_ORIGIN],
    database: mongodbAdapter(mongoose.connection.db, {
      client: mongoose.connection.getClient(),
    }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
      password: {
        hash: hash,
        verify: verify,
      },
    },
    socialProviders: {
      google: {
        clientId: ENV.GOOGLE_CLIENT_ID,
        clientSecret: ENV.GOOGLE_SECRET_KEY,
      },
    },
    advanced: {
      database: {
        generateId: false, // Use MongoDB's _id as the primary key
      },
      cookies: {
        session_token: {
          name: "printify_session_token",
        },
      },
    },
    plugins: [openAPI(), jwt()],
  });
};
