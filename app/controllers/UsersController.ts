import {Request, Response} from "express";
import {GetAllUsersService} from "../services/GetAllUsersService";
import {FilterUsersService} from "../services/FilterUsersService";

export class UsersController {
    static async getAllUsers(req: Request, res: Response): Promise<Response> {
        const users = await GetAllUsersService.handle().catch(error => res.send({
            message: error.message
        }));

        return res.send(users);
    }

    static async filterUsers(req: Request, res: Response): Promise<Response> {
        const users = await FilterUsersService.handle(
            req.body.lat,
            req.body.lng,
            req.body.radius,
            req.header("Authorization")
        ).catch(error => res.send({
            message: error.message
        }));

        return res.send(users);
    }
}
