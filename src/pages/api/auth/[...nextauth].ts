/* eslint-disable consistent-default-export-name/default-export-match-filename */
import prisma from '@/util/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import * as GoogleProvider from 'next-auth/providers/google';

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const localSessiojn = session;
      localSessiojn.user.id = user.id;
      localSessiojn.user.emailVerified = user.emailVerified;
      return localSessiojn;
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
};

export default authHandler;
