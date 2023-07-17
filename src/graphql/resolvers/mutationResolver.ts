import { MutationResolvers } from 'src/dao/generated/v2/graphql'
import addSiteMessageResolver from 'src/graphql-v2/resolvers/addSiteMessageResolver'
import { ContextV2 } from 'src/types/context'

const mutationResolver: MutationResolvers<ContextV2> = {
  addSiteMessage: addSiteMessageResolver,
}

export default mutationResolver
