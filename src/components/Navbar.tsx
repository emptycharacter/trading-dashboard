"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
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
  );
}
