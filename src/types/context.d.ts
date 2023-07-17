import ISiteMessageRepository from 'src/graphql-v2/interfaces/ISiteMessageRepository'

export type Context = {
  workmanUserId: string
  workmanClientId: string
}

export type ContextV2 = {
  siteMessageRepository: ISiteMessageRepository
}
