import { SitePk } from 'andpad-apis/node/timecard/v2/pks_pb'
import { DUMMY_ID } from 'src/constants/graphql'
import { QueryResolvers } from 'src/dao/generated/v2/graphql'
import { NetworkError } from 'src/errors/networkErrors'
import { ContextV2 } from 'src/types/context'
import getLogger from 'src/utils/getLogger'

const filename = 'src/graphql-v2/resolvers/queryResolver.ts'

const logger = getLogger({ filename })

const queryResolver: QueryResolvers<ContextV2> = {
  siteMessages: async (_parent, { siteId }, { siteMessageRepository }) => {
    const siteMessages = await siteMessageRepository.listSiteMessagePksFromSiteId(
      new SitePk().setId(siteId),
    )
    if (siteMessages instanceof NetworkError) {
      logger.error({ err: siteMessages }, 'listSiteMessagesでエラーが発生しました')
      throw siteMessages
    }
    return siteMessages.map((siteMessagesPk) => ({
      id: DUMMY_ID,
      siteMessageId: siteMessagesPk.getId(),
    }))
  },
}

export default queryResolver
