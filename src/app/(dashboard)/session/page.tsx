"use client";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UIToolKit from "components/videocall/UIToolKit"; // Assuming UIToolKit is your custom component

export default function Home() {
  const [sessionName, setSessionName] = useState("");
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-between p-12 min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex flex-1 flex-col items-center justify-center w-full max-w-md p-6 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-xl">

        {/* Heading with style */}
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600">
          Video Call Session Mode
        </h1>

        {/* Session Input with more emphasis */}
        <div className="w-full max-w-xs">
          <Input
            type="text"
            className="w-full px-4 py-3 rounded-lg text-xl placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Session Name"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
          />
        </div>

        {/* Video Call UI Toolkit */}
        <div className="mt-8">
          <UIToolKit />
        </div>

        {/* Create Session Button with animation and hover effect */}
        <Button
          className="w-full max-w-xs mt-8 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg py-3 transform transition-all duration-300 hover:scale-105"
          disabled={!sessionName}
          onClick={() => router.push(`/call/${sessionName}`)}
        >
          Create Session
        </Button>
      </div>
    </main>
  );
}
