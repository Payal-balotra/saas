"use client";

import { useState } from "react";
import { authClient } from "@/src/lib/auth-client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      console.log(error);
      return;
    }

    console.log("User created:", data);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border p-2"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border p-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-2"
        />

        <button
          type="submit"
          className="w-full rounded bg-black p-2 text-white"
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}