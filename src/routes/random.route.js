import { Router } from "express";
import { renderRandom } from "../controllers/random.controller.js";

const router = Router();

router.get("/api/randoms", renderRandom);

export default router;
