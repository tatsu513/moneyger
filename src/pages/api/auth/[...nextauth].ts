/* eslint-disable */
import { CustomSession } from '@/types/sessionType';
import prisma from '@/util/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const localSession: CustomSession = JSON.parse(JSON.stringify(session));
      localSession.user.id = user.id;
      return localSession;
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
};

export default authHandler;
