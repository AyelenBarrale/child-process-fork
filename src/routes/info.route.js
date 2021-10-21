import { Router } from "express";
import { renderInfo } from "../controllers/info.controller.js";

const router = Router();

router.get("/info", renderInfo);

export default router;
