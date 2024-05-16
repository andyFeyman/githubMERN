import express from "express";
import { getInscpts } from "../controllers/inscription.controller.js";

const router = express.Router();

router.post("/getInscpts/:address",getInscpts);
//router.get("/likes", ensureAuthenticated, getLikes);


export default router;