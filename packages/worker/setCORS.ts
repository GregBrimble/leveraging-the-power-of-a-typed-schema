interface CORSOptions {
  allowOrigin?: string;
  exposeHeaders?: string;
  maxAge?: string;
  allowCredentials?: string;
  allowMethods?: string;
  allowHeaders?: string;
}

export const setCORS = (response: Response, { allowOrigin = '*', exposeHeaders = '*', maxAge = '-1', allowCredentials = 'false', allowMethods = 'GET, POST', allowHeaders = '*' }: CORSOptions = {}) => {
  response.headers.set(
    'Access-Control-Allow-Origin', allowOrigin
  )
  response.headers.set(
    'Access-Control-Expose-Headers', exposeHeaders
  )
  response.headers.set(
    'Access-Control-Max-Age', maxAge
  )
  response.headers.set(
    'Access-Control-Allow-Credentials', allowCredentials
  )
  response.headers.set(
    'Access-Control-Allow-Methods', allowMethods
  )
  response.headers.set(
    'Access-Control-Allow-Headers', allowHeaders
  )
}