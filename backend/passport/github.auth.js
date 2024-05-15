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
			callbackURL: "https://githubmern.onrender.com/api/auth/github/callback",
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
					userEmail:profile.email
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
			callbackURL: 'https://githubmern.onrender.com/api/auth/google/callback',
		},
		async function (accessToken, refreshToken, profile, done) {
			if (!profile) {
				return done(null, false, { message: 'Google authentication failed' });
			  }
			console.log("google profile:",profile);

			const user = await User.findOne({ username: profile.displayName });
			// signup
			if (!user) {
				const newUser = new User({
					name: profile.displayName,
					username: profile.displayName,
					profileUrl: profile.photos[0].value,
					avatarUrl: profile.photos[0].value,
					likedProfiles: [],
					likedBy: [],
					userEmail:profile.emails[0].value
				});
				console.error(arguments);
				await newUser.save();
				done(null, newUser);
				//done(null, profile);
			} else {
				done(null, user);
			}
		}
	)
);

//參考官方例子：https://github.com/cfsghost/passport-github/blob/master/examples/login/app.js
