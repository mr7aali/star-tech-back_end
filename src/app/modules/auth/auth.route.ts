import express  from "express";
import { AuthController } from "./auth.controller";

const route = express.Router();

route.post("/login",AuthController.login);


route.post("/refresh-token" ,AuthController.refreshToken)


export const authRoutes = route;