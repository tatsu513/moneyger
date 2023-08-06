/* eslint-disable */
// prettier-ignore
import NextAuth from "next-auth"

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}
