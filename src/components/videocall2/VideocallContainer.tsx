import { useSession } from "next-auth/react";
//import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";
import { LinkIcon } from "lucide-react";
import ZoomVideo from "@zoom/videosdk";
import Videocall from "components/videocall2/Videocall";
import { type ChatRecord } from "components/chat/Chat";
// Hardcoded room data
const hardcodedRoom = {
  id: "12345678",
  title: "Team Meeting",
  content: "Discussion about the upcoming project deadlines.",
  time: new Date().toISOString(),
  duration: 60,
  User_CreatedBy: {
    id: "user1",
    name: "John Doe",
  },
  zoomSessionsIds: ["zoomSession1", "zoomSession2"],
  User_CreatedFor: [
    {
      id: "user2",
      name: "Jane Smith",
    },
    {
      id: "user3",
      name: "Emily Davis",
    },
  ],
  Transcripts: [],
  Notes: [],
  jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBLZXkiOiJEVXdGWC15bFJueWFBa0ZVQ2R2MFpBIiwic2RrS2V5IjoiRFV3RlgteWxSbnlhQWtGVUNkdjBaQSIsIm1uIjoiMTIzNDU2NzgiLCJyb2xlIjoxLCJ0b2tlbkV4cCI6MTczNTU2NzczNSwiaWF0IjoxNzM1NTY0MTM1LCJleHAiOjE3MzU1Njc3MzV9.0yYC5u9u-xlEZaGCG5dTJGmHYlE35-6QjQJKxP7oy5w", 
};

const Home = () => {
  const { toast } = useToast();
  const { data: userData } = useSession();

  // Type check for userData to ensure the id exists
  if (!userData || !userData.user) {
    // Handle missing session data
    return <div>Loading...</div>;
  }


  const copyLink = async () => {
    const link = `${window.location.toString()}`;
    await navigator.clipboard.writeText(link);
    toast({ title: "Copied link to clipboard", description: link });
  };

  return (
    <div className="relative m-0 flex min-h-screen w-full flex-1 flex-col self-center bg-gray-100 px-0 pb-8">
      <div className="mx-16 mt-4 flex flex-row bg-white">
        <div className="flex flex-1 flex-col rounded-l-md p-3">
          <span className="inline-flex">
            <Button variant={"link"} className="flex" onClick={copyLink}>
              <h1 className="text-left text-3xl font-bold text-gray-700">{hardcodedRoom.title}</h1>
              <LinkIcon height={24} className="ml-2 text-gray-700" strokeWidth={3} />
            </Button>
          </span>
          <span className="inline-flex">
            <p className="ml-4 text-left text-lg text-gray-700">{hardcodedRoom.content}</p>
            <p className="ml-4 text-left text-lg text-gray-700">| {new Date(hardcodedRoom.time).toTimeString().split(" ")[0]}</p>
          </span>
        </div>
        <div className="h-full justify-center self-center rounded-r-md p-4">
        </div>
      </div>
      <Videocall
        JWT={hardcodedRoom.jwt}
        slug={hardcodedRoom.id}
      />
      
    </div>
  );
};

export default Home;
