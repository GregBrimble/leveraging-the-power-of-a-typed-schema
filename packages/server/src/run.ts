import { server } from './server'

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`)
})
