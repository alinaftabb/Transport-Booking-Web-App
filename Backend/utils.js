const JWT = require('jsonwebtoken');

// Generate JWT token
const generateToken = user => {
  return JWT.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.SECRET_JWT_KEY,
    { expiresIn: '10d' }
  );
};

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authentication failed: No token provided' });
  }

  JWT.verify(
    token.split(' ')[1],
    process.env.SECRET_JWT_KEY,
    (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: 'Authentication failed: Invalid token' });
      }
      req.user = decoded;
      next();
    }
  );
};

// Middleware function to check if the user has the required role
const checkUserRole = requiredRole => (req, res, next) => {
  const role = req.body.role;
  if (requiredRole == role) {
    return next();
  } else {
    return res
      .status(403)
      .json({ message: 'Access denied. Insufficient permissions.' });
  }
};

module.exports = { generateToken, authenticateJWT, checkUserRole };
