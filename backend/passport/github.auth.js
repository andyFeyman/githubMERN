import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import User from "../models/user.model.js";

dotenv.config();

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: "http://localhost:5001/api/auth/github/callback",
		},
		async function (accessToken, refreshToken, profile, done) {
			const user = await User.findOne({ username: profile.username });
			// signup
			if (!user) {
				const newUser = new User({
					name: profile.displayName,
					username: profile.username,
					profileUrl: profile.profileUrl,
					avatarUrl: profile.photos[0].value,
					likedProfiles: [],
					likedBy: [],
				});
				console.error(arguments);
				await newUser.save();
				done(null, newUser);
			} else {
				done(null, user);
			}
		}
	)
);



passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:5001/api/auth/google/callback',
		},
		async function (accessToken, refreshToken, profile, done) {
			if (!profile) {
				return done(null, false, { message: 'Google authentication failed' });
			  }
			console.log("google profile:",profile);
			console.log("Access token:", accessToken);
			console.log("Refresh token:", refreshToken);

			const user = await User.findOne({ username: profile.username });
			// signup
			if (!user) {
				const newUser = new User({
					name: profile.displayName,
					username: profile.displayName,
					profileUrl: profile.photos[0].value,
					avatarUrl: profile.photos[0].value,
					likedProfiles: [],
					likedBy: [],
				});
				console.error(arguments);
				await newUser.save();
				//return done(null, newUser);
				return done(null, profile);
			} else {
				return done(null, User);
			}
		}
	)
);

//參考官方例子：https://github.com/cfsghost/passport-github/blob/master/examples/login/app.js
