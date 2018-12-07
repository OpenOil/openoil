const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

module.exports = app => {
  /* REGISTER */
  app.post("/api/account/register", (req, res, next) => {
    const { body } = req;
    let { email } = body;
    const { password } = body;
    const { firstname } = body;
    const { lastname } = body;
    const { company } = body;
    const { title } = body;
    const { city } = body;
    const { state } = body;
    const { country } = body;

    if (!email) {
      return res.send({
        success: false,
        message: "Error: Please enter an Email."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Please enter a Password."
      });
    }
    if (!firstname) {
      return res.send({
        success: false,
        message: "Error: Please enter a First Name."
      });
    }
    if (!lastname) {
      return res.send({
        success: false,
        message: "Error: Please enter a Last Name."
      });
    }
    if (!company) {
      return res.send({
        success: false,
        message: "Error: Please enter a Company."
      });
    }
    if (!title) {
      return res.send({
        success: false,
        message: "Error: Please enter a Title."
      });
    }
    if (!city) {
      return res.send({
        success: false,
        message: "Error: Please enter a City."
      });
    }
    if (!state) {
      return res.send({
        success: false,
        message: "Error: Please enter a State."
      });
    }
    if (!country) {
      return res.send({
        success: false,
        message: "Error: Please enter a Country."
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find(
      {
        email: email
      },
      (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            message: "Error: Account already exist."
          });
        }
        // Save the new user
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.firstname = firstname;
        newUser.lastname = lastname;
        newUser.company = company;
        newUser.title = title;
        newUser.city = city;
        newUser.state = state;
        newUser.country = country;
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error"
            });
          }
          return res.send({
            success: true,
            message: "Successfully Registered!"
          });
        });
      }
    );
  }); // ENDPOINT: Register

  /* LOGIN */
  app.post("/api/account/login", (req, res, next) => {
    const { body } = req;
    let { email } = body;
    const { password } = body;

    if (!email) {
      return res.send({
        success: false,
        message: "Error: Please enter an Email."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Please enter a Password."
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    User.find(
      {
        email: email
      },
      (err, users) => {
        if (err) {
          //Error finding email
          console.log("Sign In Error:", err);
          return res.send({
            success: false,
            message: "Error: server error"
          });
        }
        if (users.length != 1) {
          // If there is no user that matches that email
          return res.send({
            success: false,
            message: "Error: Invalid Email"
          });
        }
        const user = users[0]; // Get the db record with that user email
        if (!user.validPassword(password)) {
          // If the password is invalid
          return res.send({
            success: false,
            message: "Error: Invalid Password"
          });
        }
        // Otherwise correct user email and password
        const userSession = new UserSession();
        userSession.userId = user._id; // Set Session.userId to Mongo._id
        userSession.save((err, doc) => {
          if (err) {
            // Error saving userSession
            console.log(err);
            return res.send({
              success: false,
              message: "Error: server error"
            });
          }
          return res.send({
            success: true,
            message: "Valid Login",
            token: doc._id // Token is _id
          });
        });
      }
    );
  }); // ENDPOINT: Login

  /* VERIFY */
  app.get("/api/account/verify", (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        } else {
          // DO ACTION
          return res.send({
            success: true,
            message: "Verified Token"
          });
        }
      }
    );
  }); // ENDPOINT: Verify

  /* LOGOUT */
  app.get("/api/account/logout", (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false // find the token
      },
      {
        $set: {
          isDeleted: true // set the token to deleted
        }
      },
      null,
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        return res.send({
          success: true,
          message: "Logout successful"
        });
      }
    );
  }); // ENDPOINT: Logout
};
