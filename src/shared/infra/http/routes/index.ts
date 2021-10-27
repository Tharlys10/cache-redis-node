import { Router } from "express";

import { sessionRoutes } from "./session.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/session", sessionRoutes);
router.use("/users", usersRoutes);

export { router }