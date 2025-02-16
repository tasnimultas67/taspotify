"use client"; // Mark this as a Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Spotify Clone</h1>
      {!token ? (
        <a
          href="/api/auth"
          className="bg-green-500 px-6 py-3 rounded-full font-semibold"
        >
          Login to Spotify
        </a>
      ) : (
        <div>
          <button
            onClick={logout}
            className="bg-red-500 px-6 py-3 rounded-full font-semibold"
          >
            Logout
          </button>
          {/* Add your music player components here */}
        </div>
      )}
    </div>
  );
}
