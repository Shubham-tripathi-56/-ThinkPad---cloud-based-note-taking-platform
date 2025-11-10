const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken'); 
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'shubham$tripathi'

//ROUTE 1: CREATE A USER USING: POST  "/api/auth/createuser"  ;    NO LOGIN REQUIRED;
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 Characters').isLength({ min: 5 }),
], async (req, res) => {

  let success = false ;
  //================================[ TO ADD EXPRESS VALIDATION]=====================================//
  //--------> IF THERE ARE ERRORS, RETURN BAD REQUEST AND THE ERRORS

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success , errors: errors.array() });
  }

  //---------------------------------------------------------------//

  try {
    //-----> CHECK WHETHER THE USER WITH THIS EMAIL EXITS ALREADY


    let user = await User.findOne({ email: req.body.email })

    if (user) {
      return res.status(400).json({ success , error: "sorry a user with this email already exists" })
    }
    //------------------

    const salt = await bcrypt.genSalt(10);

    // secPass = bcrypt.hash(password ,salt)                 -- -->  example
    const secPass = await bcrypt.hash(req.body.password, salt);

    //------>   CREATE A NEW USER
    user = await User.create({
      name: req.body.name,
      // password: req.body.password,
      password: secPass,
      email: req.body.email
    })

    // res.send(user);
    //--------------------------------//
    // TO SEND JWT TOKEN ----------------------------->
    const data = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true ;
    res.json({success ,  authtoken })
    //====================================================================================//


    //---------->   CATCH  ERROR
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error ");
  }

})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ROUTE 2: AUTHENTICATE A USER USING: POST  "/api/auth/login"  ;    NO LOGIN REQUIRED;

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

  let success = false ;
  //--------> IF THERE ARE ERRORS, RETURN BAD REQUEST AND THE ERRORS
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //----------------------------------
  //------->  WHENN USER SEND EMAIL AND PASSWORD
  const { email, password } = req.body;

  try {
    //----------->  CHECK USER
    let user = await User.findOne({ email });
    if (!user) {
      success = false ;
      return res.status(400).json({ success , error: "Please try to login with correct credentials" });
    }

    //-------------------------//
    //------>CHECK PASSWORD
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false ;
      return res.status(400).json({ success , error: "Please try to login with correct credentials" });
    }

    //--------------------------//
    //------> WHEN EMAIL AND PASSWORD ARE TRUE
    const data = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true ;
    res.json({success, authtoken })

    //=============================================================//
    //----------> IF ERROR IN CODE UNDER TRY
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error ");
  }


})
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//ROUTE 3: GET LOGGEDIN USER DETAILS USING: POST  "/api/auth/getuser"  ;    LOGIN REQUIRED;
router.post('/getuser',fetchuser, async (req, res) => {

  //------>  THERE WE ARE USE MIDDLE

try {
  userId = req.user.id;
const user = await User.findById(userId).select("-password")
res.send(user);


} catch (error) {
  console.error(error.message)
  res.status(500).send("Internal Server Error ");
}

})
/////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router