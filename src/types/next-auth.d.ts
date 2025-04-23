import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string; // Agrega la propiedad 'id'
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Si tienes un rol, inclúyelo aquí
    } & DefaultSession["user"]; // Extiende las propiedades predeterminadas
  }

  interface User {
    id: string; // ID del usuario
    name: string;
    email: string;
    role: string; // Rol del usuario
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // ID del usuario en el token JWT
    role: string; // Rol del usuario en el token JWT
  }
}