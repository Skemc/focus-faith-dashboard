import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokenHelper = token => {
  try {
    const decodedToken = verify(token, 'QWERTYUIOZXCVBNMGFDS');
    if (!decodedToken) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
export default tokenHelper;