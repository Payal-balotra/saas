"use client";

import { authClient } from "@/src/lib/auth-client";



export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>You are not logged in.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="mt-6 rounded-lg border p-6">
        <p>
          Welcome, {session.user.name}
        </p>

        <p className="mt-2 text-gray-600">
          {session.user.email}
        </p>
      </div>

      <button
        onClick={async () => {
          await authClient.signOut();
          window.location.href = "/login";
        }}
        className="mt-6 rounded-md bg-black px-4 py-2 text-white"
      >
        Logout
      </button>
    </main>
  );
}