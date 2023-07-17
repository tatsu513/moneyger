import { SiteMessagePk } from 'andpad-apis/node/timecard/v2/pks_pb'
import { ISiteMessageServiceClient } from 'andpad-apis/node/timecard/v2/site_message_grpc_pb'
import { SiteMessage } from 'andpad-apis/node/timecard/v2/types_pb'
import DataLoader from 'dataloader'
import { NetworkErrorType } from 'src/errors/networkErrors'
import batchGetSiteMessages from 'src/graphql-v2/dao/batchGetSiteMessages'
import ISiteMessageRepository from 'src/graphql-v2/interfaces/ISiteMessageRepository'

/**
 * SiteMessageService用のRepository
 */
class SiteMessageRepository implements ISiteMessageRepository {
  private readonly siteMessageServiceClient: ISiteMessageServiceClient
  private readonly siteMessageLoader
  constructor(
    callerUserId: string,
    callerClientId: string,
    siteMessageServiceClient: ISiteMessageServiceClient,
  ) {
    this.siteMessageServiceClient = siteMessageServiceClient

    this.siteMessageLoader = new DataLoader<SiteMessagePk, SiteMessage, string>(
      (pks) =>
        batchGetSiteMessages(callerUserId, callerClientId, pks, this.siteMessageServiceClient),
      { cacheKeyFn: (key) => key.getId() },
    )
  }

  getSiteMessage(pk: SiteMessagePk): Promise<SiteMessage | NetworkErrorType> {
    return this.siteMessageLoader.load(pk).catch((e: NetworkErrorType) => e)
  }
}

export default SiteMessageRepository
