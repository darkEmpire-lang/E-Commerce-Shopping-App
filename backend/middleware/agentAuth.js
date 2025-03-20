import jwt from 'jsonwebtoken';

const agentAuth = async (req, res, next) => {
  try {
    // Get token from Authorization header (Bearer <token>)
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Token required. Not Authorized' });
    }

    // Verify the token and get the decoded data
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token (user info) to req.user
    req.agent = decodedToken;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: 'Invalid or expired token. Not Authorized' });
  }
};

export default agentAuth;
