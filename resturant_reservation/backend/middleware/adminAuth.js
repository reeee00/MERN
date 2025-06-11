import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    // Directly read the token from the 'token' header
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized User" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Assuming you stored `data` as adminEmail+adminPassword when creating the token
    const expected = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
    if (decoded.data !== expected) {
      return res.status(403).json({ success: false, message: "User is not authorized" });
    }

    next(); // Success
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default adminAuth;
