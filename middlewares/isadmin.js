// middleware/isAdmin.js

exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  };
  