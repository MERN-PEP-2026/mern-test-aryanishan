const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const token = req.header('x-auth-token');

  if(!token){
    return res.status(401).json({
      success: false,
      message: 'No token, authorization denied'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Support current token shape ({ userId }) and older shapes ({ user }).
    req.user = decoded.userId || decoded.user?.id || decoded.user;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token payload'
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};
