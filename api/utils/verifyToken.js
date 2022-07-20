const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeader = req.headers.token;
  const token = authHeader.split(" ")[1];

  if (authHeader) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      //assigning user to req body
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: "You are not authenticated",
    });
  }
};

const verifyAndAuth = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do this");
    }
  });
};
const verifyAndAdmin = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do this");
    }
  });
};

module.exports = { verify, verifyAndAuth, verifyAndAdmin };
