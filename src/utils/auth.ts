import jwt from "jsonwebtoken";

type UserPayload = {
  role: "admin" | "docente";
  [key: string]: any; // Otras propiedades del token si las hay
};

export function decodeToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "default_secret") as UserPayload;
  } catch (error) {
    return null;
  }
}
