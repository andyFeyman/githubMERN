import express from "express";
import { getInscpts } from "../controllers/inscription.controller.js";
import { getDetail } from "../controllers/inscription.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";
import { addComment,updateComment,delComment,getAllComments,replyToComment } from "../controllers/inscription.controller.js";


const router = express.Router();

router.get("/getInscpts/:address",getInscpts);
//router.get("/likes", ensureAuthenticated, getLikes);

router.get("/getDetail/:inscptId",getDetail);
//router.get("/likes", ensureAuthenticated, getLikes);

router.get("/getAllComments/:inscptId",getAllComments);

router.post("/addComment",ensureAuthenticated,addComment);

router.post("/updateComment",ensureAuthenticated,updateComment);

router.get("/delComment/:commentId",ensureAuthenticated,delComment);

router.post("/replyToComment",ensureAuthenticated,replyToComment)



export default router;


