import { SiteMessagePk } from 'andpad-apis/node/timecard/v2/pks_pb'
import { SiteMessage } from 'andpad-apis/node/timecard/v2/types_pb'
import { NetworkErrorType } from 'src/errors/networkErrors'

export default interface ISiteMessageRepository {
  getSiteMessage(pk: SiteMessagePk): Promise<SiteMessage | NetworkErrorType>
}
