const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//You're getting your User table from this require statement
const db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email"
    },
    (email, password, done) => {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email: email
        }
      }).then(dbUser => {
        // If there's no user with the given email
        console.log("This is the one user returned from the database after the .findOne() method was run on the Users table: ")
        console.log(dbUser)

        if (!dbUser) {

          console.log("The user didn't match the one in the database. The user is: ")
          console.log(dbUser)

          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {

          console.log("The password didn't match the one in the database: ")
          console.log("The password currently being passed in is: ")
          console.log(password)
          console.log("dbUser.validPassword(password) is: ")
          console.log(dbUser.validPassword(password))


          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user

        return done(null, dbUser);

        console.log("done(null, dbUser): ")
        console.log(done(null, dbUser))
      }).catch(err=>{
        console.log(err)
      });//add a .catch() to see if it fixed an issue with "unhandled promises" show in the terminal
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
