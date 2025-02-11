
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Dummy user for now (replace with database check)
        if (credentials?.email === "user@example.com" && credentials?.password === "password") {
          return { id: "1", name: "Trader", email: "user@example.com" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // Set this in .env.local
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
