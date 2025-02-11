"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="p-4 bg-blue-600 text-white flex justify-between">
        <div className="flex gap-6">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/options-chain" className="hover:underline">Options Chain</Link>
        </div>

        {/* Show login/logout */}
        <div>
          {session ? (
            <div className="flex gap-4 items-center">
              <span>{session.user?.email}</span>
              <button onClick={() => signOut()} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-green-500 px-4 py-2 rounded">Login</button>
            </Link>
          )}
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Welcome, <strong>{session?.user?.email}</strong>!</p>

        {/* Additional features go here */}
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold">Trading Journal (Coming Soon)</h2>
          <p>Track your trades and analyze performance.</p>
        </div>
      </div>
    </main>
  );
}
