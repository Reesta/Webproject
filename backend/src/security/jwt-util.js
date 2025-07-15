import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const generateToken = (payload) => {
    console.log('Generating token for payload:', payload); // Debug log
    
    const options = {
      expiresIn: process.env.EXPIRES_IN || '24h', // Token expiration time with fallback
    };
    
    const token = jwt.sign(payload, process.env.SECRET_KEY, options);
    console.log('Generated token:', token); // Debug log
    return token;
  };
  
  export {
    generateToken,
  }