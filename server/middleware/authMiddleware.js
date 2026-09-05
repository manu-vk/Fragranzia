// const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   try {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = decoded;

//       next();

//     } else {
//       return res.status(401).json({ message: "Not authorized, no token" });
//     }

//   } catch (error) {
//     res.status(401).json({ message: "Token failed" });
//   }
// };

// module.exports = protect;
// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ SAFE FORMAT (IMPORTANT)
    req.user = {
      id: decoded.id,
      isAdmin: decoded.isAdmin
    };

    next();

  } catch (error) {
    return res.status(401).json({ message: "Token failed" });
  }
};

module.exports = protect;