import { Request, Response } from "express"
import {LoginUserService} from "../services/LoginUserService";

export class AuthController {
    static async login(req: Request, res: Response): Promise<Response> {
        const token = await LoginUserService.handle(req.body.username, req.body.password)
            .catch(error => res.send({
                message: error.message
            }))

        return res.send({
            access_token: token
        })
    }
}
