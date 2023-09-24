const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const User = require("../Models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "thismustbeencryptedcode";
//Route:1 Create a user using:/ POST "/api/auth/createuser" . No login required
router.post(
  "/createuser",
  [
    body(
      "name",
      "Enter a valid name that must be atleast 5 character"
    ).isLength({ min: 5 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "password must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);

    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      // check wheather the user with this email is already exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(400)
          .json({ success,error: "Sorry a user with this email id already exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });
      //   res.json(user);
      const data = {
        user: {
          id: user.id,
        },
      };
      const Authtoken = jwt.sign( data , JWT_SECRET);
      success = true;
      res.json({success, Authtoken });
      //catch a error
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message,"Internal server error");
    }
  }
);

//Route:2 Authenticate a user using:/ POST "/api/auth/login" . No login required

router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "password can't be blank ").exists(),
  ],
  async (req, res) => {
    // if there are errors, return Bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destucturing email and password from body
    const { email, password } = req.body;
    try {
      // finding email from database
      let user = await User.findOne({ email });
      if (!user) {
        success =false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      // compairing database password for perticular email with current password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success =false;
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }
      // sending the user perticular id token
      const data = {
        user: {
          id: user.id,
        },
      };
      const Authtoken = jwt.sign({ data }, JWT_SECRET);
      success = true;
      res.json({success, Authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message,"Internal server error");
    }
  }
);

//Route:3 Get loggedin User details using:/ POST "/api/auth/getuser" .login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message,"Internal server error");
  }
});
module.exports = router;
