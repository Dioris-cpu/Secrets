// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// passport.serializeUser(function (user, done) {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//       done(err, user);
//     });
//   });
  
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         callbackURL: "https://localhost:3000/auth/google/secrets",
//         userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//       },
//       function (accessToken, refreshToken, profile, cb) {
//         console.log(profile);
//         User.findOrCreate({ googleId: profile.id }, function (err, user) {
//           return cb(err, user);
//         });
//       }
//     )
//   );
  
//   module.exports = passport