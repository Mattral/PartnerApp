"use client";

import { type TranscriptEleType } from "components/videocall/Transcript";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";
import { LinkIcon } from "lucide-react";
import { useState, useRef } from "react";
import ZoomVideo from "@zoom/videosdk";
import Videocall from "components/videocall/Videocall";
import { type ChatRecord } from "components/chat/Chat"; // I want to remove this parts

// Define types to match the expected structure of room data
type User = {
  id: number;
};

type Room = {
  id: string;
  title: string;
  content: string;
  time: string;
  User_CreatedBy: User;
};

type MockRoomData = {
  room: Room;
  jwt: string;
};

// Mocking the `api.room.getById` query response for testing
const mockRoomData: MockRoomData = {
  room: {
    id: "1",
    title: "Test Room",
    content: "This is a test link ",
    time: "https://partner-app-beta.vercel.app/pages/room?cr_sessionKey=Y3RAPVXJXOACACK2GUM6R7IM8Z0CVUS97DSQ&gai_code=ca",
    User_CreatedBy: { id: 1 },  // Assume creator has ID 1
  },
  jwt: "mock-jwt-token",
};

const Home = () => {
  const [inCall, setInCall] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { data: userData } = useSession();
  const [records, setRecords] = useState<ChatRecord[]>([]);
  const [transcriptionSubtitle, setTranscriptionSubtitle] = useState<TranscriptEleType>({});
  const client = useRef(ZoomVideo.createClient());

  // Replacing the actual API call with mocked data

  const isLoading = false;
  const isError = false;
  const error = null;
  const data = mockRoomData; // Use the mocked data here instead of the real API call

  if (isError) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100">
        <h1>Error: </h1>
      </div>
    );
  }

  const copyLink = async () => {
    const link = `${window.location.toString()}`;
    await navigator.clipboard.writeText(link);
    toast({ title: "Copied link to clipboard", description: link });
  };

  if (!isLoading && data) {
    return (
      <>
        <div className="relative m-0 flex min-h-screen w-full flex-1 flex-col self-center bg-gray-100 px-0 pb-8">
          <div className="mx-16 mt-4 flex flex-row bg-white ">
            <div className="flex flex-1 flex-col rounded-l-md p-3">
              <span className="inline-flex">
                <Button variant={"link"} className="flex" onClick={copyLink}>
                  <h1 className="text-left text-3xl font-bold text-gray-700">{data.room.title}</h1>
                  <LinkIcon height={24} className="ml-2 text-gray-700" strokeWidth={3} />
                </Button>
              </span>
              <span className="inline-flex">
                <p className="ml-4 text-left text-lg text-gray-700">{data.room.content}</p>
                <p className="ml-4 text-left text-lg text-gray-700">| {data.room.time}</p>
              </span>
            </div>

          </div>
          <Videocall
            jwt={data.jwt}
            session={data.room.id}
            client={client}
            setRecords={setRecords}
            isCreator={data.room.User_CreatedBy.id === 2}
            setTranscriptionSubtitle={setTranscriptionSubtitle}
            inCall={inCall}
            setInCall={setInCall}
          />
        </div>
      </>
    );
  }

  return null;
};

export default Home;
