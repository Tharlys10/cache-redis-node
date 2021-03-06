import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { FindUserByIdController } from "@modules/users/useCases/findUserById/FindUserByIdController";
import { ProfileUserController } from "@modules/users/useCases/profileUserUseCase/ProfileUserController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const usersRoutes = Router();

usersRoutes.post("/", new CreateUserController().handle);
usersRoutes.get("/profile/auth", ensureAuthentication, new ProfileUserController().handle);
usersRoutes.get("/:id", ensureAuthentication, new FindUserByIdController().handle);

export { usersRoutes }