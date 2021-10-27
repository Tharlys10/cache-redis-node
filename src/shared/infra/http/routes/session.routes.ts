import { Router } from "express";

import { AuthenticateUserController } from "@modules/session/useCases/authenticateUser/AuthenticateUserController";

const sessionRoutes = Router();

sessionRoutes.post("/", new AuthenticateUserController().handle);

export { sessionRoutes }