import { createHash } from "crypto";
// TODO: Tirar essas variaveis daqui, colocar como variaveis de ambiente!
export const clientId = "a231b024415042f4b3b61f9eb216c646";
export const grantType = "authorization_code";
export const redirectPKCEUri = "http://localhost:3000/pkce_auth";
export const redirectUri = "http://localhost:3000/auth";
export const scope = "playlist-modify-private playlist-read-private";

export const generateRandomString = () => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 50; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const generateCodeChallenge = async (codeVerifier: string) => {
  function base64encode(buf: Buffer) {
    return buf
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const data = new TextEncoder().encode(codeVerifier);
  const digest = createHash("sha256").update(data).digest();

  return base64encode(digest);
};
