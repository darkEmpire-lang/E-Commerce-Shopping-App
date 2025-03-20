import jwt from 'jsonwebtoken'

const authagent = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access Denied! No Token Provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.agent = verified;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid Token!' });
  }
};

export default  authagent;