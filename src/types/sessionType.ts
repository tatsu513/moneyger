import { Session } from 'next-auth';

export type CustomSession = Session & {
  user: {
    id: string;
  };
};
