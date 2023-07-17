import { SiteMessagePk } from 'andpad-apis/node/timecard/v2/pks_pb'
import { SiteMessageType as GrpcSiteMessageType } from 'andpad-apis/node/timecard/v2/types_pb'
import { DateTime } from 'luxon'
import { DATE_TIME_FORMATS } from 'src/constants/dateTimeFormats'
import { DUMMY_ID } from 'src/constants/graphql'
import {
  SiteMessageType as GraphqlSiteMessageType,
  SiteMessage,
  SiteMessageResolvers,
} from 'src/dao/generated/v2/graphql'
import { NetworkError } from 'src/errors/networkErrors'
import ISiteMessageRepository from 'src/graphql-v2/interfaces/ISiteMessageRepository'
import generateGraphqlId from 'src/graphql-v2/resolvers/generateGraphqlId'
import { ContextV2 } from 'src/types/context'
import getLogger from 'src/utils/getLogger'

const logger = getLogger({
  filename: 'src/graphql-v2/resolvers/siteMessageResolver.ts',
})

const siteMessageResolver: SiteMessageResolvers<ContextV2, SiteMessage> = {
  // 作業日誌のシステムID
  id: (parent, _args, _) => {
    return generateGraphqlId('SiteMessage', parent.siteMessageId)
  },
  // 作業日誌ID
  siteMessageId: (parent, _args, _) => {
    return parent.siteMessageId
  },
  // 作業日誌種別
  messageType: async (parent, _args, { siteMessageRepository }) => {
    const siteMessage = await internalSiteMessageResolver(
      parent.siteMessageId,
      siteMessageRepository,
    )
    return siteMessage.messageType ?? null
  },
}

const internalSiteMessageResolver = async (
  siteMessageId: string,
  siteMessageRepository: ISiteMessageRepository,
): Promise<Omit<SiteMessage, 'id' | 'siteMessageId'>> => {
  const siteMessage = await getSiteMessage(siteMessageId, siteMessageRepository)
  if (siteMessage instanceof NetworkError) {
    return {}
  }
  const siteId = siteMessage.getSitePk()?.getId()
  const messageType = (() => {
    const siteMessageType = siteMessage.getMessageType()
    switch (siteMessageType) {
      case GrpcSiteMessageType.SITE_MESSAGE_TYPE_UNSPECIFIED:
        logger.error({ siteMessageType }, '予期しないデータが返ってきました。入場として扱います')
        return GraphqlSiteMessageType.Entrance
      case GrpcSiteMessageType.SITE_MESSAGE_TYPE_ENTRANCE:
        return GraphqlSiteMessageType.Entrance
      case GrpcSiteMessageType.SITE_MESSAGE_TYPE_EXIT:
        return GraphqlSiteMessageType.Exit
    }
  })()

  return {
    site: siteId ? { id: DUMMY_ID, siteId } : null,
    title: siteMessage.getTitle(),
    message: siteMessage.getMessage(),
    messageType: messageType,
    startAt: siteMessage.getStartAt(),
    startAtForDisplay: DateTime.fromISO(siteMessage.getStartAt()).toFormat(
      DATE_TIME_FORMATS.FULL_DATE_TIME_24H,
    ),
    expiredAt: siteMessage.getExpiredAt(),
    expiredAtForDisplay: DateTime.fromISO(siteMessage.getExpiredAt()).toFormat(
      DATE_TIME_FORMATS.FULL_DATE_TIME_24H,
    ),
    isEnabled: siteMessage.getDisabledAt() ? false : true,
  }
}

const getSiteMessage = async (
  siteMessageId: string,
  siteMessageRepository: ISiteMessageRepository,
) => {
  const siteMessage = await siteMessageRepository.getSiteMessage(
    new SiteMessagePk().setId(siteMessageId),
  )
  if (siteMessage instanceof NetworkError) {
    logger.error({ siteMessageId, err: siteMessage }, '作業日誌に紐づく現場の取得に失敗しました')
  }
  return siteMessage
}

export default siteMessageResolver
