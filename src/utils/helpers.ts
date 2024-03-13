import bcrypt from "bcrypt";
import JWT, { Secret } from "jsonwebtoken";
import variables from "../../config/variables";

const JWT_SECRET = variables.jwt.token || "jwt_secret";

const helpers = {
  hashPassword: async (pass: string): Promise<string> => {
    try {
      const hashedPassword = await bcrypt.hash(pass, 12);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  },
  verifyPassword: async (pass: string, hashedPassword: string): Promise<boolean> => {
    try {
      const verified = await bcrypt.compare(pass, hashedPassword);
      return verified;
    } catch (error) {
      throw error;
    }
  },
  encodeJWT: (payload: any): string => {
    try {
      const token = JWT.sign(payload, JWT_SECRET as Secret, {
        algorithm: "HS512"
      });
      return token;
    } catch (error) {
      throw error;
    }
  },
  decodeJWT: (token: string): any => {
    try {
      const payload = JWT.verify(token, JWT_SECRET as Secret);
      return payload;
    } catch (error) {
      throw error;
    }
  }
};

export default helpers;