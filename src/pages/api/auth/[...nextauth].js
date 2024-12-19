import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      pages: {
        signIn: "/signin",
      },
      callbacks: {
        async signIn({ account, profile }) {
          if (account.provider === "google") {
            return (
              profile.email_verified && profile.email.endsWith("@example.com")
            );
          }
          return true;
        },
      },
    }),
  ],
};

export default NextAuth(authOptions);
