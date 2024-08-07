import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import https from 'https';
import passport from "passport";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";

import "./passport/github.auth.js";

import userRoutes from "./routes/user.route.js";
import exploreRoutes from "./routes/explore.route.js";
import authRoutes from "./routes/auth.route.js";
import inscptRoutes from "./routes/inscription.route.js"

import connectMongoDB from "./db/connectMongoDB.js";

//使用该语句临时禁用证书验证。
//https.globalAgent.options.rejectUnauthorized = false;
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());//它会解析 Content-Type 为 application/json 的请求。
app.use(bodyParser.urlencoded({ extended: true }));//{ extended: true } 选项允许解析复杂对象，如嵌套对象。

// Here we can remove the cors, it's not necessary in production because the frontend and backend are on the same domain. I forgot to mention that in the video, sorry about that.🙄
//app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/inscpt",inscptRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
	connectMongoDB();
});


