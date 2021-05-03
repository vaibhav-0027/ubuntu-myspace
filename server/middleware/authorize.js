const jwt = require("jsonwebtoken");

//this middleware will on continue on if the token is inside the local storage

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");

  // Check if not token
  if (!token) {
    return res.status(403).json({ message: "authorization denied" });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, "jwt-secret");

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(201).json({ msg: "Token is not valid", status: 401 });
  }
};