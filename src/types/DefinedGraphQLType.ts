import { Resolvers } from '@/dao/generated/graphql';

type DefinedGraphQLType = keyof Resolvers;

export default DefinedGraphQLType;
