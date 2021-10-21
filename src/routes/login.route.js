import { Router } from "express";
import {
  renderLoginForm,
  facebookAuthentication,
  failLog,
  logOk,
  renderWelcome,
  renderLogout,
  logout,
} from "../controllers/login.controller.js";

const router = Router();

router.get("/", renderLoginForm);

router.get("/", facebookAuthentication);

router.get("/", failLog);

router.post("/welcome", logOk);

router.get("/welcome", renderWelcome);

router.get("/logout", renderLogout);

router.post("/logout", logout);

export default router;
