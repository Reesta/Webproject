import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Middleware to verify JWT token
export function authenticateToken(req, res, next) {
  try {

    if(req.path == "/api/auth/login" || req.path == "/api/auth/signup" || req.path == "/api/auth/admin/login" || req.path == "/api/auth/admin/register") {
      return next();
    }
    console.log('Headers received:', req.headers);
    
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    console.log('Auth header:', authHeader);
    
    if (!authHeader) {
      console.log('No Authorization header found');
      return res.status(401).send({ message: "Access denied. No token provided." });
    }

    // Handle token with or without Bearer
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    console.log('Processed token:', token);

    if (!token) {
      console.log('Token is empty after processing');
      return res.status(401).send({ message: "Access denied. No token provided." });
    }

    if (!process.env.secretkey) {
      console.error('Missing secret key in environment variables');
      return res.status(500).send({ message: "Server configuration error" });
    }

    jwt.verify(token, process.env.secretkey, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err.message);
        return res.status(403).send({ message: `Invalid or expired token: ${err.message}` });
      }
      
      console.log('Decoded token payload:', decoded);
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(500).send({ message: "Internal server error during authentication" });
  }
}