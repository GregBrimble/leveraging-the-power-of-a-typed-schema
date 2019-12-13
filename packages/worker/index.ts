global.__STATIC_CONTENT_MANIFEST = `{"asset-manifest.json":"asset-manifest.f30704f12071a4476338b5d69c09c677df2e97934dcd985d0bfdb9c65bac0b4b.json","index.html":"index.2f863a3974c97b32f9e317c2c774d6c84037d1eff85ef6464dfaf089e76ca878.html","manifest.json":"manifest.bf2b0ae91b5f1de6740d4358cc1388f85b3b7ae18a09eeea6ddc8fb78a183ab0.json","static/js/runtime-main.88d4f3f8.js.map":"static/js/runtime-main.88d4f3f8.js.b606eee656a1185c57e3de51028f6e58340a521533698b904a6348db23b58032.map","service-worker.js":"service-worker.6adf92dc5e2c10a6ac0db379decfdc19dbb93f5643a21e9adb5330340c7e7632.js","static/js/runtime-main.88d4f3f8.js":"static/js/runtime-main.88d4f3f8.590fabe49937e53aa6872a36368502011e050459d34c3194e28268f2f70e9303.js","static/js/2.03fccce6.chunk.js":"static/js/2.03fccce6.chunk.61d21379e86a151bc53783fcb26e9fb1d0dbd2d8337f81e7c828a338b48ce9e7.js","static/js/2.03fccce6.chunk.js.map":"static/js/2.03fccce6.chunk.js.153aa836b948f290d57e3a1d35bcaa23bd1cbb27e868d9b8cb3e31abd2dbb3f1.map","robots.txt":"robots.56073a1dd6475f702dc9739240be1e89b2871c179b96197a18bf2ea818eee4ab.txt","static/css/main.60eb0dd2.chunk.css.map":"static/css/main.60eb0dd2.chunk.css.575a6bed07d7a6f1577788eae3589b6aeead4244426d0bc8c128dfe4d87dec87.map","static/js/main.cd4c88c1.chunk.js":"static/js/main.cd4c88c1.chunk.8f3e0aeb84ffbf299b6879f0df852b382951b73d825aa7ccc43e1c86d7c0ccb1.js","precache-manifest.551bfe539fb214271856f904f676ee04.js":"precache-manifest.551bfe539fb214271856f904f676ee04.f838e6eb5228b6744b38aa3fcf350182a5d4bfa2a0a98243e6e699a1dc34dec0.js","icon512.png":"icon512.8e80a41d3ee9c4f72bfbdc5ae9a959654e026b1c3be944f7a16dc76e56c9a339.png","favicon.ico":"favicon.d128b428d7331b1b2e768fd7b061385c4b320b309feedcc991f012362c4c0208.ico","static/js/main.cd4c88c1.chunk.js.map":"static/js/main.cd4c88c1.chunk.js.a8d16ce2ae3f9c4bc630c4fa01426c1731c760abfd146db68d61a274f8be8cb2.map","icon192.png":"icon192.832d89429c9fb83999e9f1d568c956d68cba802ede810b716a65df78f2663df9.png","static/css/main.60eb0dd2.chunk.css":"static/css/main.60eb0dd2.chunk.cc8e6860d3497a18b32606d25c61d0daae928f4551a273bc8fd9d015754643eb.css","static/js/2.03fccce6.chunk.js.LICENSE":"static/js/2.03fccce6.chunk.js.a24526e5b8f1a146e7617819c0b89478a734bdf6489ead3a049eb2dccf9ff6f0.LICENSE"}`

import {} from '@cloudflare/workers-types'
import {
  getAssetFromKV,
  serveSinglePageApp,
} from '@cloudflare/kv-asset-handler'
import { handleRequest as graphQL } from '../server/src/cloudflare'
import { setCORS } from './setCORS'

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
    bypassCache: true,
  },
  mapRequestToAsset: serveSinglePageApp,
}

const handleAssetRequest = async (event: FetchEvent): Promise<Response> => {
  try {
    return await getAssetFromKV(event, assetOptions)
  } catch (e) {
    return new Response(e.message || e.toString(), {
      status: 500,
      headers: { 'Content-Type': `text/plain` },
    })
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
