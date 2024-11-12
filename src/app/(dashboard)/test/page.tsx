"use client";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getData } from "data/getToken"; // Assuming this fetches the JWT based on session slug
import Script from "next/script";
import UIToolKit from "components/videocall/UIToolKit"; // Assuming UIToolKit is your custom component
import { videoCallStyle } from "lib/utils"; // You can use this for custom styles

// Dynamically import the Videocall component (disabling SSR)
const Videocall = dynamic<{ slug: string; JWT: string }>(
  () => import("components/Videocall"),
  { ssr: false }
);

export default function Home() {
  const [sessionName, setSessionName] = useState<string>("");
  const [jwt, setJwt] = useState<string | null>(null);
  const [isCallStarted, setIsCallStarted] = useState<boolean>(false);

  // Function to handle session creation
  const handleSessionCreation = async () => {
    if (sessionName) {
      try {
        const jwtToken = await getData(sessionName); // Fetch JWT based on session name
        setJwt(jwtToken); // Set JWT for the call
        setIsCallStarted(true); // Start the call flow
      } catch (error) {
        console.error("Error fetching JWT:", error);
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* Container for the session creation page */}
      {!isCallStarted ? (
        <div className="flex flex-col items-center justify-center w-full max-w-md p-6 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-xl">
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

          {/* Button to create session */}
          <Button
            className="w-full max-w-xs mt-8 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg py-3 transform transition-all duration-300 hover:scale-105"
            disabled={!sessionName} // Disable if session name is empty
            onClick={handleSessionCreation}
          >
            Create Session
          </Button>
        </div>
      ) : (
        // Once the session is created, show the Videocall component
        <Videocall slug={sessionName} JWT={jwt!} />
      )}

      {/* Service Worker script */}
      <Script src="/coi-serviceworker.js" strategy="beforeInteractive" />
    </main>
  );
}
