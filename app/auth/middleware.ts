import { Request, Response, NextFunction } from "express";
import { authClient } from "../graphql/AuthClient";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    if (! authToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
};
