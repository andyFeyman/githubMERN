import express from "express";
import { getInscpts } from "../controllers/inscription.controller.js";
import { getDetail } from "../controllers/inscription.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";
import { addComment,getAllComments } from "../controllers/inscription.controller.js";


const router = express.Router();

router.get("/getInscpts/:address",getInscpts);
//router.get("/likes", ensureAuthenticated, getLikes);

router.get("/getDetail/:inscptId",getDetail);
//router.get("/likes", ensureAuthenticated, getLikes);

router.post("/addComment",ensureAuthenticated,addComment);

router.get("/getAllComments/:inscptId",getAllComments);

export default router;


