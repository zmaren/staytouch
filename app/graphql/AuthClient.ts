import { GraphQLClient } from "graphql-request";

export const authClient = (token?: String) => {
    return new GraphQLClient(process.env.HASURA_URL, { headers: {
            "Authorization": `${token}`
        }    
    });
};
