export type ContextIds = {
  workmanUserId: string;
  workmanClientId: string;
};

type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
};

// そのうち中身を書くのでdisable
// eslint-disable-next-line
export type Context = {
  user: User;
};
