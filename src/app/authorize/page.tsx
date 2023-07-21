"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { clientId, redirectUri } from "@/services/spotify_login";

export default function Authorize() {
  const params = useSearchParams();
  const [codeVerifier, setCodeVerifier] = useState("");
  const code = params.get("code") as string;
  const state = params.get("state") as string;

  useEffect(() => {
    setCodeVerifier(window.localStorage.getItem("code_verifier") as string);
  }, []);

  if (codeVerifier) {
    let body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    });
    const response = fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    })
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
      code: {code}
      state: {state}
      verifier: {codeVerifier}
      <div>popopo</div>;
    </>
  );
}
