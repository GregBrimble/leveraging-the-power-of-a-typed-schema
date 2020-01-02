import {} from '@cloudflare/workers-types'
import {
  getAssetFromKV,
  serveSinglePageApp,
} from '@cloudflare/kv-asset-handler'
import { handleRequest as graphQL } from '../server/src/cloudflare'
import { setCORS } from './setCORS'

const DEBUG_MODE = true

const graphQLOptions = {
  cors: {},
}

const handleGraphQLRequest = async ({
  request,
}: FetchEvent): Promise<Response> => {
  const response =
    request.method === `OPTIONS`
      ? new Response(null, { status: 204 })
      : await graphQL(request)
  setCORS(response, graphQLOptions.cors)
  return response
}

const assetOptions = {
  cacheControl: {
    bypassCache: DEBUG_MODE,
  },
  mapRequestToAsset: serveSinglePageApp,
}

const handleAssetRequest = async (event: FetchEvent): Promise<Response> => {
  try {
    return await getAssetFromKV(event, assetOptions)
  } catch (e) {
    return new Response(
      DEBUG_MODE ? `Internal Server Error` : e.message || e.toString(),
      {
        status: 500,
        headers: { 'Content-Type': `text/plain` },
      }
    )
  }
}

const handleRequest = (event: FetchEvent): Promise<Response> => {
  const { request } = event
  const url = new URL(request.url)

  if (url.pathname === `/graphql`) {
    return handleGraphQLRequest(event)
  }

  return handleAssetRequest(event)
}

addEventListener(`fetch`, (event: Event & FetchEvent) => {
  event.respondWith(handleRequest(event))
})
