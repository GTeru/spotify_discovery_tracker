"use client";

import {
  clientId,
  generateCodeChallenge,
  generateRandomString,
  redirectUri,
} from "@/services/spotify_login";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [codeVerifier, setCodeVerifier] = useState("");
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("code_verifier", codeVerifier);
  }, [codeVerifier]);

  const loginSpotify = async () => {
    const code = generateRandomString();
    setCodeVerifier(code);

    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      console.log(codeChallenge);
      const state = generateRandomString();
      const scope = "user-read-private user-read-email";

      console.log(codeVerifier);
      let args = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      });
      router.push("https://accounts.spotify.com/authorize?" + args.toString());
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-800">
      <button
        className="rounded-full bg-green-500 p-4 text-black drop-shadow-md"
        onClick={loginSpotify}
      >
        Login to Spotify
      </button>
    </main>
  );
}
