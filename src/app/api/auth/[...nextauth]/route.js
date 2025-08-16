import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const BASE_API_URL = process.env.BASE_API_URL;
const NEXTAUTH_SECRET_KEY = process.env.NEXTAUTH_SECRET_KEY;

export const authOptions = {
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

          let user = await fetch(BASE_API_URL + `/findUserByToken`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          user = await user.json();
          console.log(user);

          return {
            user: user.data,
            apiToken: token,
          };
        } else {
          response = await response.json();
          throw new Error(response.detailMessage);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: NEXTAUTH_SECRET_KEY,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.apiToken = user.apiToken;
        token.expires = Date.now() + 3 * 24 * 60 * 60 * 1000;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.apiToken = token.apiToken;
        session.expires = new Date(token.expires).toISOString();
      }
      return session;
    },
  },
};

export async function GET(req, res) {
  return NextAuth(req, res, authOptions);
}

export async function POST(req, res) {
  return NextAuth(req, res, authOptions);
}
