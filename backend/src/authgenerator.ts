import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT as string;

function createToken(payload: Jwt.JwtPayload) {
  console.log(Jwt.sign(payload, JWT_SECRET));
  return Jwt.sign(payload, JWT_SECRET);
}

function validateToken(token: string) {
  return Jwt.verify(token, JWT_SECRET);
}

export { createToken, validateToken };
