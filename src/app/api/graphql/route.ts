import { Resolvers } from "@/dao/generated/graphql"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { globSync } from "glob"
import fs from "fs"
const resolvers: Resolvers = {
  Query: {
    listPayments: () => {
      return [
        {
          currentAmount: 2000,
          id: 1,
          name: "食費",
          maxAmount: 30000,
        },
        {
          currentAmount: 9000,
          id: 2,
          name: "日用品",
          maxAmount: 10000,
        },
      ]
    },
  },
}

const server = new ApolloServer({
  typeDefs: [
    globSync(`${process.cwd()}/graphql/schema.graphql`).map((file) => {
      return fs.readFileSync(file, {
        encoding: "utf8",
      })
    }),
  ],
  resolvers,
})

const handler = startServerAndCreateNextHandler(server)

export async function GET(request: Request) {
  return handler(request)
}
export async function POST(request: Request) {
  return handler(request)
}
