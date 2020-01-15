import { config } from './config'
import { createTestClient } from 'apollo-server-testing'
import { gql } from 'apollo-server-cloudflare'
import { ApolloServer } from 'apollo-server'

const { query } = createTestClient(new ApolloServer(config))

describe(`the universe`, () => {
  it(`can do math`, () => {
    expect(1 + 1).toBe(2)
  })
})

describe(`the server`, () => {
  it(`can respond to queries`, async () => {
    const response = await query({
      query: gql`
        query test {
          hello
        }
      `,
    })
    expect(response.data).toEqual({ hello: `Hello, world!` })
  })
})
