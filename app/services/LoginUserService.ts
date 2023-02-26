import {gql} from "graphql-request";
import {generateJWT} from "../auth/jwt";
import {client} from "../graphql/Client";
import * as bcrypt from "bcrypt";

export class LoginUserService {
    static async handle(username: String, password: String) {
        try {
            let {users} = await client.request(
                gql`
                    query getUserByUsername($username: String!) {
                        users(where: { username: { _eq: $username } }) {
                            id
                            password
                        }
                    }
                `,
                {
                    username,
                }
            );

            // Since we filtered on a non-primary key we got an array back
            const user = users[0];

            if (!user) {
                throw new Error("Unauthorized");

                return;
            }

            // Check if password matches the hashed version
            const passwordMatch = await bcrypt.compare(password.toString(), user.password);

            if (! passwordMatch) {
                throw new Error("Unauthorized");
            }

            return generateJWT({
                defaultRole: "admin",
                allowedRoles: ["admin"],
                otherClaims: {
                    "X-Hasura-User-Id": user.id.toString(),
                }
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
