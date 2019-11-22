import {} from "@cloudflare/workers-types";
import { server } from "./server";
import { graphqlCloudflare } from "apollo-server-cloudflare/dist/cloudflareApollo";

const handleRequest = (request): Promise<Response> =>
  (graphqlCloudflare(() => server.createGraphQLServerOptions(request))(
    request
  ) as Promise<any>) as Promise<Response>;

export { handleRequest };
