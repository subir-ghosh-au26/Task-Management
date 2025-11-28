const jwt = require('jsonwebtoken');

// Verify JWT Token
const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers['authorization'] || req.headers['Authorization'];
  
  if (!tokenHeader) {
    return res.status(403).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    const token = tokenHeader.split(' ')[1]; 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

// Verify Admin Role
const verifyAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'Admin')) {
    next();
  } else {
    res.status(403).json({ message: `Access Denied. Server sees your role as: '${req.user?.role}'` });
    
  }
};

module.exports = { verifyToken, verifyAdmin };