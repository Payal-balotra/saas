"use client";

import { authClient } from "../lib/auth-client";


export default function GoogleLogin() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/dashboard",
    });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full rounded-md border px-4 py-2"
    >
      Continue with Google
    </button>
  );
}