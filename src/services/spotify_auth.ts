// TODO: Tirar essas variaveis daqui, colocar como variaveis de ambiente!
const clientId = "a231b024415042f4b3b61f9eb216c646";
const clientSecret = "318145f42c3e43e7b3fa735798fc0b57";

export const getTokenHeader = () => {
  return {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    )}`,
  };
};
