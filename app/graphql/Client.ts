import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(process.env.HASURA_URL, {
  headers: { "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET },
});
