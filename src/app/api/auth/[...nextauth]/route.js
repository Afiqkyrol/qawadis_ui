import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const BASE_API_URL = process.env.BASE_API_URL;
const API_SECRET_KEY = process.env.API_SECRET_KEY;
const NEXTAUTH_SECRET_KEY = process.env.NEXTAUTH_SECRET_KEY;

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        let response = await fetch(BASE_API_URL + "/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            body: {
              email: credentials.email,
              password: credentials.password,
            },
          }),
        });

        if (response.ok) {
          response = await response.json();

          const token = response.data;
          const decodedToken = jwt.decode(token);
          console.log(decodedToken);

          return {
            userId: decodedToken.sub,
            apiToken: token,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.apiToken = user.apiToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.userId = token.userId;
        session.apiToken = token.apiToken;
      }
      return session;
    },
  },
  secret: NEXTAUTH_SECRET_KEY,
  // pages: {
  //     signIn: '/auth/signin'
  // }
};

export async function GET(req, res) {
  return NextAuth(req, res, authOptions);
}

export async function POST(req, res) {
  return NextAuth(req, res, authOptions);
}
