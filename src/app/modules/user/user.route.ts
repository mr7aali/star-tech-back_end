import  express  from "express";
import { UserController } from "./user.controller";

const route = express.Router();


route.post("/create",UserController.create);


export const UserRoute = route;