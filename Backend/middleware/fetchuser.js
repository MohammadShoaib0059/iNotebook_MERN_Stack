const JWT_SECRET = "thismustbeencryptedcode";
const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  // Get ther user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate with valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.data.user;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate with valid token" });
  }
};
module.exports = fetchuser;
