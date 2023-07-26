"use client";
import { grantType, redirectUri } from "@/services/spotify_pkce_auth";
import { getTokenHeader as getTokenHeaders } from "@/services/spotify_auth";
import { useSearchParams } from "next/navigation";

export default function Auth() {
  const params = useSearchParams();
  const code = params.get("code") as string;

  if (code) {
    const requestOptions = {
      method: "POST",
      headers: getTokenHeaders(),
      body: new URLSearchParams({
        grant_type: grantType,
        code: code,
        redirect_uri: redirectUri,
      }),
    };

    fetch("https://accounts.spotify.com/api/token", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <div className="p-10">code :{code}</div>
    </>
  );
}
