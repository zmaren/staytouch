import {gql} from "graphql-request";
import {authClient} from "../graphql/AuthClient";
import * as jwt from "jsonwebtoken";

export class FilterUsersService {
    static async handle(lat: String, lng: String, radius: number, header: String) {
        const authUserId = await this.getAuthUserId(header);

        try {
            return await authClient(header).request(
                gql`
                    query getUsersWithinRadius($lat: float8, $lng: float8, $radius: float8, $authUserId: String) {
                        find_users_within_radius(args: {
                            lat: $lat,
                            lng: $lng,
                            radius: $radius,
                            authuserid: $authUserId
                        }) {
                            id,
                            first_name,
                            last_name,
                            gender,
                            user_trackings {
                                lat,
                                lng
                            }
                        }
                    }
                `,
                {
                    lat,
                    lng,
                    radius,
                    authUserId
                }
            );
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async getAuthUserId(token: String): Promise<String> {
        const parsedToken = jwt.decode(token.replace("Bearer ", ""));
        const claimsPath = process.env.CLAIMS_PATH;

        return parsedToken[claimsPath]["X-Hasura-User-Id"];
    }
}
