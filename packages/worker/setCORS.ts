export const setCORS = (
  response: Response,
  {
    allowOrigin = `*`,
    exposeHeaders = `*`,
    maxAge = `-1`,
    allowCredentials = `false`,
    allowMethods = `GET, POST`,
    allowHeaders = `*`,
  } = {}
): void => {
  response.headers.set(`Access-Control-Allow-Origin`, allowOrigin)
  response.headers.set(`Access-Control-Expose-Headers`, exposeHeaders)
  response.headers.set(`Access-Control-Max-Age`, maxAge)
  response.headers.set(`Access-Control-Allow-Credentials`, allowCredentials)
  response.headers.set(`Access-Control-Allow-Methods`, allowMethods)
  response.headers.set(`Access-Control-Allow-Headers`, allowHeaders)
}
