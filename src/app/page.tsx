"use client";

import {
  clientId,
  generateCodeChallenge,
  generateRandomString,
  redirectPKCEUri,
  redirectUri,
  scope,
} from "@/services/spotify_pkce_auth";
import { useEffect, useState } from "react";

export default function PublicHome() {
  const [codeVerifier, setCodeVerifier] = useState("");

  useEffect(() => {
    sessionStorage.setItem("code_verifier", codeVerifier);
    if (codeVerifier)
      generateCodeChallenge(codeVerifier).then((codeChallenge) => {
        const state = generateRandomString();
        let args = new URLSearchParams({
          response_type: "code",
          client_id: clientId,
          scope: scope,
          redirect_uri: redirectPKCEUri,
          state: state,
          code_challenge_method: "S256",
          code_challenge: codeChallenge,
        });
        window.location =
          "https://accounts.spotify.com/authorize?" + args.toString();
      });
  }, [codeVerifier]);

  const loginPKCE = () => {
    const code = generateRandomString();
    setCodeVerifier(code);
  };

  const login = async () => {
    const state = generateRandomString();
    let args = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
    });
    console.log(args.toString());
    window.location =
      "https://accounts.spotify.com/authorize?" + args.toString();
  };

  return (
    <main className="flex flex-col items-center justify-between p-24 space-y-10">
      <button
        className="rounded-full bg-green-500 p-4 text-black drop-shadow-md"
        onClick={loginPKCE}
      >
        Login to Spotify with PKCEs
      </button>
      <button
        onClick={login}
        className="rounded-full bg-green-500 p-4 text-black drop-shadow-md"
      >
        Login to Spotify
      </button>
    </main>
  );
}
