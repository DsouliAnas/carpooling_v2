const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request
    console.log("Token decoded:", decoded); // Log decoded token to check its content
    next();
  } catch (error) {
    console.error("Error verifying token:", error); // Log the error
    return res.status(400).json({ message: "Invalid or expired token." });
  }
};

module.exports = { verifyToken };
