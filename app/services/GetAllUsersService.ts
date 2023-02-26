import {gql} from "graphql-request";
import {generateJWT} from "../auth/jwt";
import {client} from "../graphql/Client";
import * as bcrypt from "bcrypt";

export class GetAllUsersService {
    static async handle() {
        return await client.request(
            gql`
                query getAllUsers {
                    users {
                        id
                        first_name,
                        last_name,
                        gender
                    }
                }
            `,
        );
    }
}
