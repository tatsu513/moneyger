/* eslint-disable consistent-default-export-name/default-import-match-filename */
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/util/prisma';

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    // CredentialProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     username: {
    //       label: 'Username:',
    //       type: 'text',
    //       placeholder: 'your name',
    //     },
    //     password: {
    //       label: 'Password:',
    //       type: 'password',
    //       placeholder: 'password',
    //     },
    //   },
    //   authorize(credentials) {
    //     const user = { id: '34', name: 'okawa', password: 'okawa' };
    //     if (
    //       credentials?.username === user.name &&
    //       credentials?.password === user.password
    //     ) {
    //       return user;
    //     }
    //     return null;
    //   },
    // }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};
