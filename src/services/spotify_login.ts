// TODO: Tirar essas variaveis daqui, colocar como variaveis de ambiente!
export const clientId = "a231b024415042f4b3b61f9eb216c646";
export const clientSecret = "1a187195d53d47bf8d5265f021d42e90";
export const grantType = "authorization_code";
export const redirectUri = "http://localhost:3000/authorize";

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
  function base64encode(buf: ArrayBuffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buf)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
};
