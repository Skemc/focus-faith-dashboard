import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = token => {
  try {
    const decodedToken = verify(token, 'QWERTYUIOZXCVBNMGFDS');
    return decodedToken;
  } catch (error) {
    return false;
  }
};
export default verifyToken;