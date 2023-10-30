import  express  from "express";
import { UserController } from "./user.controller";

const route = express.Router();


route.post("/create",UserController.create);
route.get("/profile/:id",UserController.profile);
route.get("/",UserController.getAll);


export const UserRoute = route;