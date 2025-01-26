import dotenv from "dotenv";
dotenv.config();

export const config = {
  venlyAuth: {
    url: "https://login.venly.io/auth/realms/Arkane/protocol/openid-connect/token",
    clientId: process.env.VENLY_CLIENT_ID || "",
    clientSecret: process.env.VENLY_CLIENT_SECRET || "",
  },
  port: process.env.PORT || 4000,
};
