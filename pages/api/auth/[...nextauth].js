import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { comparePassword } from "../../../lib/auth";

import { db } from "../../../lib/db";

export default NextAuth({
  // site: process.env.NEXTAUTH_URL,
  secret: "sdsadd532dsf54654fgd",
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60, // the session will last 1 days
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const userExits = await db.oneOrNone(
          `SELECT * FROM users WHERE email = $1`,
          [credentials.email]
        );
        if (!userExits) {
          throw new Error("User tidak ditemukan");
        }

        const isValid = await comparePassword(
          credentials.password,
          userExits.password
        );

        if (!isValid) {
          throw new Error("Password tidak valid");
        }
        return {name: userExits.nama, email: userExits.email };
      },
    }),
  ],
});
