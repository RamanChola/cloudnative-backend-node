const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.token.split(" ")[1];

    if (!token) {
      return res.status(401).json("Authentication failed");
    }
    const decodedToken = jwt.verify(token, "supera");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    // console.log(err);
    res.status(403).json("Token is not Valid");
  }
};
