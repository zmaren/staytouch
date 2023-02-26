import { Router } from 'express';
import { AuthController } from "../controllers/AuthController";
import {UsersController} from "../controllers/UsersController";
import {authMiddleware} from "../auth/middleware";

const router = Router();

router.use(authMiddleware);

router.get('/', UsersController.getAllUsers);
router.post('/', UsersController.filterUsers);

export default router;
