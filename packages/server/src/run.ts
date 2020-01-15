import { config } from './config'
import { ApolloServer } from 'apollo-server'

const server = new ApolloServer(config)

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`)
})
