"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  clientId,
  grantType,
  redirectPKCEUri,
} from "@/services/spotify_pkce_auth";
import { useRouter } from "next/navigation";

export default function Authorize() {
  const router = useRouter();
  const params = useSearchParams();
  const [codeVerifier, setCodeVerifier] = useState("");
  const code = params.get("code") as string;
  const state = params.get("state") as string;

  useEffect(() => {
    setCodeVerifier(sessionStorage.getItem("code_verifier") as string);
  }, []);

  if (codeVerifier) {
    let body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectPKCEUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    });
    fetch("https://accounts.spotify.com/api/token", {
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
        router.push("http://localhost:3000/user/home");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <div className="p-8">code: {code}</div>
      <div className="p-8">state: {state}</div>
      <div className="p-8">verifier: {codeVerifier}</div>
    </>
  );
}
