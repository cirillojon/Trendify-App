const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const sendVerificationEmail = require('./backend/email.js');
const sendPasswordResetEmail = require('./backend/passwordReset.js');

require('dotenv').config();

// Imports all the mongoose schemas from the "schemas" folder
const User = require("./backend/schemas/userSchema");
const emailToken = require("./backend/schemas/emailToken");
const passwordReset = require("./backend/schemas/passwordResetToken");

// For hashing 
const bcrypt = require('bcryptjs');
var token = require('./createJWT.js');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);


const path = require('path');
const { ObjectId } = require('mongodb');
const { TokenExpiredError } = require('jsonwebtoken');
const { send } = require('process');

const PORT = process.env.PORT || 5000;
const app = express();

app.set('port', PORT);

app.use(cors());
app.use(bodyParser.json());

const mongodb_URI = process.env.MONGODB_URI;

mongoose.connect(mongodb_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch((err) => console.log(err));

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

//Encrypting text
function encrypt(text) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

app.post('/api/register', async(req, res) => {

  //Incoming: firstName, lastName, email, password, password2
  //Outgoing: errors

  let error = "";

  const {login, password, name} = req.body; 

  //const loginHash = encrypt(login);

  const checkUserEmail = await User.findOne({Login: login});
  if(checkUserEmail) return res.status(400).json({error: "Email Already Exists"});

  const newUser = new User({
    Name: name,
    Login: login,
    Password: password,
    isVerified: false,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.Password, salt, (err, hash) => {
      if (err) throw err;

      newUser.Password = hash;
      newUser.save();
    });
  });

  // Creates an email verification token
  const emailVerificationToken = new emailToken({
	  userID: newUser._id,
	  token: crypto.randomBytes(32).toString('hex')
  });

  await emailVerificationToken.save();

  // Sends a verification email to verify the email
  sendVerificationEmail(newUser._id, newUser.Name, login, emailVerificationToken.token);
  

  ret = {error: error};
  res.status(200).json(ret);
});

// -------------------------------------------------------------------------------------------------------------------------------------------------
// Verifies the email of the registered user
app.post("/api/emailVerification", async (req, res) => {

  const checkUser = await User.findOne({_id: ObjectId(req.body.userID)});
  if(!checkUser){
    console.log("checkUser")
    return res.status(200).json({error: "Error at checking userID in server.js email verification"});
  } 

  const checkEmailToken = await emailToken.findOne({userID: req.body.userID, token: req.body.uniqueEmailToken});
  if(!checkEmailToken){
    console.log("checkEmailToken")
    return res.status(200).json({error: "emailToken does not exist"});
  } 

  // Changes isVerified classification for the user to true.
  checkUser.isVerified = true;
  await checkUser.save();

  // Deletes the email token from emailToken collection
  emailToken.deleteOne({userID: ObjectId(req.body.userID), token: req.body.uniqueEmailToken},
    (err) =>{
      if(err){
          console.log(err);
      }
  });
  console.log(req.body.userID)
  console.log(req.body.uniqueEmailToken)
  // Creates a stat history for the new user

  console.log(`${checkUser.Login} is now verified`);

  res.status(200).json({
      status: "Successful",
      in: "/emailVerification/:userID/:uniqueEmailToken",
      message: `Successfully verified ${checkUser.Login}`
  });
});

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// Password Reset API that allows a user to reset their password
// Takes in:
//      email
app.post("/api/requestPasswordReset", async(req, res) => {
    const email = req.body.email;
    // Checks if a user with the given email exists
    const checkUser = await User.findOne({Login: email});
    if(!checkUser) return res.status(400).json({error: "Email does not exist"});

    // Creates a new password reset token
    const passwordResetToken = new passwordReset({
        userID: checkUser._id,
        resetToken: crypto.randomBytes(32).toString('hex')
    });

    // Adds the password reset token to the passwordresets collection in mongodb
    await passwordResetToken.save();

    console.log(passwordResetToken.resetToken);

    sendPasswordResetEmail(checkUser._id, checkUser.Name, email, passwordResetToken.resetToken);

    res.status(200).json({error: ""});
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------
// Takes in:
//      newPassword
app.post("/api/passwordReset", async (req, res) => {
    const {userID, passwordToken, newPassword} = req.body; 
    
    console.log(userID, passwordToken, newPassword);
    // Checks if the user exists
    const checkUser = await User.findOne({_id: userID});
    if(!checkUser) return res.status(200).json({error: "User does not exist"});

    const checkPasswordResetToken = await passwordReset.findOne({userID: userID, token: passwordToken});
    if(!checkPasswordResetToken){
      console.log("checkEmailToken")
      return res.status(200).json({error: "Reset password token expired"});
    } 


    // Hashes the new password and saves the user.
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPassword, salt, (err, hash) => {
        if (err) throw err;
        checkUser.Password = hash;
        checkUser.save();
      });
    });

    // Deletes the password reset token
    await passwordReset.deleteOne({userID: ObjectId(userID), resetToken: passwordToken});

    console.log("Password successfully reset");
    res.status(200).json({error: ""});
});


//login API
app.post('/api/login', async (req, res, next) => {

  //Incoming: email, password
  //Outgoing: acessToken, fn, ln, id, error

  let errors = {}

  const { login, password } = req.body;

  User.findOne({
    Login: login
  }).then((user) => {

    if (!user) {
      return res.status(400).json({
        error: "No account belongs to that email"
      });
    }

    if(user.isVerified == false) {
      return res.status(400).json({
        error: "Account is not verified, please check email for verification email"
      });
    }

    const password = req.body.password;

    bcrypt.compare(password, user.Password).then(isMatch => {
      if (isMatch) {

        try
        {
          const token = require("./createJWT.js");
          ret = token.createToken( user.Name, user._id );
        }
        catch(e)
        {
          ret = {error:e.message};
        }

        return res.status(200).json({ret});

      } else {

        return res.status(400).json({
          error: "Invalid password"
        });
      }
    });
  });
});

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );

  next();
});

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
