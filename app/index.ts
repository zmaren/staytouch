import { Request, Response } from "express";
import * as express from "express";
import * as bcrypt from "bcrypt";
import { gql } from "graphql-request";
import { client } from "./graphql/Client";
import { generateJWT } from "./auth/jwt";
import * as dotenv from 'dotenv';
import { authClient } from "./graphql/AuthClient";
import { authMiddleware } from "./auth/middleware";
import authRoutes from "../app/routes/authRoutes"
import userRoutes from "./routes/userRoutes";

const app = express();
const port = process.env.APP_ID || 8081;

dotenv.config();

app.use(express.json());
app.use('/auth', authRoutes)
app.use('/users', userRoutes)

app.listen(port, () => {
  console.log(`Auth server running on port ${port}.`);
});
