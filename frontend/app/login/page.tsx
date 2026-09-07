import GoogleLogin from "@/src/components/GoogleLogin";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <GoogleLogin/>
      </div>
    </main>
  );    
}