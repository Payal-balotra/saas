"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/src/lib/auth-client";

export default function TwoFactorPage() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { data, error } =
      await authClient.twoFactor.verifyTotp({
        code,
        trustDevice: true,
      });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Two-Factor Authentication
        </h1>

        <p className="text-gray-600">
          Open Google Authenticator and enter the 6-digit code.
        </p>

        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="123456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded border p-3 text-center text-xl tracking-widest"
          required
        />

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black p-3 text-white"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </main>
  );
}