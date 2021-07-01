import { open } from "sqlite";
import sqlite3 from "sqlite3";

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";

interface Credentials {
  email: string;
  password: string;
}

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials: Credentials) {
        try {
          const db = await open({
            filename: "./sitedb.sqlite",
            driver: sqlite3.Database,
          });

          const { email, password } = credentials;

          const user = await db.get("select * from user where email=?", [
            email,
          ]);

          if (!user) {
            throw Error("User not exist.");
          }

          const isValid = await verifyPassword(password, user.password);

          if (!isValid) {
            throw new Error("Password incorrect");
          }

          return { email: user.email };
        } catch (err) {
          throw err;
        }
      },
    }),
  ],
});
