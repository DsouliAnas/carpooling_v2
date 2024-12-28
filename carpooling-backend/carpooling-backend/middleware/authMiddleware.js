const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;

    // Use JWT_SECRET from environment variables
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error); // Log the error
    return res.status(400).json({ message: "Invalid or expired token." });
  }
};

module.exports = { verifyToken };
