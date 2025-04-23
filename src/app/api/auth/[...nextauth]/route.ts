import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "src/db/index"; // Asegúrate de importar tu conexión Drizzle
import { usuarios } from "src/db/schema"; // Importa tu esquema
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        correo: { label: "Correo", type: "email", placeholder: "tuemail@ejemplo.com" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.correo || !credentials?.password) {
          throw new Error("Todos los campos son obligatorios.");
        }

        // Buscar usuario en la base de datos
        const user = await db
          .select()
          .from(usuarios)
          .where(eq(usuarios.correo, credentials.correo))
          .then((res) => res[0]); // Tomar el primer resultado

        if (!user) {
          throw new Error("No se encontró el usuario.");
        }

        // Verificar contraseña
        const match = await bcrypt.compare(credentials.password, user.password);
        if (!match) {
          throw new Error("Contraseña incorrecta.");
        }

        return {
          id: user.id_usuario.toString(),
          name: user.nombre,
          email: user.correo,
          role: user.rol,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
