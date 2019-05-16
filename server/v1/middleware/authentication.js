import Jwt from '../utils/jwt';

export const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'Access denied. No token provided.'
    });
  }

  try {
    const decoded = await Jwt.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: 'Invalid token.'
    });
  }
};

export const adminAuth = (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    return res.status(403).json({
      status: 403,
      error: 'Access denied. For Admins only.'
    });
  }
  return next();
};
