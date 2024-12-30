import { useSession } from "next-auth/react";
import { useRef, useState, MutableRefObject } from "react";
import { VideoClient, VideoQuality, type VideoPlayer, type ChatMessage } from "@zoom/videosdk";
import { PhoneOff } from "lucide-react";
import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";
import SettingsModal from "./SettingsModal";
import ActionModal from "./ActionModal";
import TranscriptionButton from "./TranscriptionButton";
import RecordingButton from "./RecordingButton";
import { CameraButton, MicButton } from "./MuteButtons";
import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";
import { WorkAroundForSafari } from "utils/safari";
import { videoCallStyle } from "lib/utils";
import UIToolKit from "./UIToolKit";
import { type setTranscriptionType } from "./Transcript";
import { type ChatRecord } from "components/chat/Chat";
// Mock the writeZoomSessionID mutation with a dummy implementation
import { useRouter } from "next/navigation";

const writeZoomSessionID = {
  mutate: () => Promise.resolve("Dummy Zoom Session ID")
};

const Videocall = (props: VideoCallProps) => {
  const { setTranscriptionSubtitle, isCreator, jwt, session, client, inCall, setInCall } = props;
  const [isAudioMuted, setIsAudioMuted] = useState(false);  // Default to false: audio unmuted
  const [isVideoMuted, setIsVideoMuted] = useState(false);  // Default to false: video unmuted
  const router = useRouter();

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { data } = useSession();
  const { toast } = useToast();

  const init = async () => {
    await client.current.init("en-US", "Global", { patchJsMedia: true });
    client.current.on("peer-video-state-change", (payload) => void renderVideo(payload));
    client.current.on("chat-on-message", onChatMessage);
    await client.current.join(session, jwt, "User").catch((e) => {
      console.log("Error joining call:", e);
    });

    if (isCreator) {
      await writeZoomSessionID.mutate().then((zoomSessionId) => {
        console.log("Mock Zoom Session ID:", zoomSessionId);
      });
    }
  };

  const startCall = async () => {
    toast({ title: "Joining", description: "Please wait..." });
    try {
      await init();
      setInCall(true);
  
      const mediaStream = client.current.getMediaStream();
      
      // Safari workaround
      // @ts-expect-error
      if (window.safari) {
        await WorkAroundForSafari(client.current);
      } else {
        await mediaStream.startAudio();
      }
      
      setIsAudioMuted(client.current.getCurrentUserInfo().muted ?? true);
  
      // Start video only if it's allowed
      await mediaStream.startVideo();
      setIsVideoMuted(!client.current.getCurrentUserInfo().bVideoOn);
      await renderVideo({ action: "Start", userId: client.current.getCurrentUserInfo().userId });
    } catch (error) {
      console.error("Error during call start: ", error);
      toast({ title: "Error", description: "Failed to start the video call." });
    }
  };
  
  const renderVideo = async (event: { action: "Start" | "Stop"; userId: number }) => {
    const mediaStream = client.current.getMediaStream();
    if (event.action === "Stop") {
      const element = await mediaStream.detachVideo(event.userId);
      if (Array.isArray(element)) {
        element.forEach((el) => el.remove());
      } else {
        element.remove();
      }
    } else {
      try {
        const userVideo = await mediaStream.attachVideo(event.userId, VideoQuality.Video_360P);
        if (videoContainerRef.current) {
          videoContainerRef.current.appendChild(userVideo as VideoPlayer);
        }
      } catch (error) {
        console.error("Error attaching video: ", error);
      }
    }
  };
  

  const onChatMessage = (payload: ChatMessage) => {
    props.setRecords((previous) => [...previous, payload]);
    if (payload.sender.userId !== client.current.getCurrentUserInfo().userId) {
      toast({ title: `Chat from: ${payload.sender.name}`, description: payload.message, duration: 1000 });
    }
  };

  const leaveCall = async () => {
    toast({ title: "Leaving", description: "Please wait..." });
    client.current.off("peer-video-state-change", (payload: { action: "Start" | "Stop"; userId: number }) => void renderVideo(payload));
    client.current.off("chat-on-message", onChatMessage);
    await client.current.leave().catch((e) => console.log("leave error", e));
    window.location.href = "/";
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col rounded-md px-6 bg-gradient-to-r from-white via-gray-100 to-gray-200">
      {/* Video Display - Only show during call */}
      <div className={`flex w-full flex-1 ${inCall ? "block" : "hidden"}`}>
        {/* Video Player Container */}
        {/* @ts-expect-error html component */}
        <video-player-container ref={videoContainerRef} className="rounded-lg shadow-xl" style={videoCallStyle} />
      </div>

      {/* Call initiation UI */}
      {!inCall ? (
        <div className="mx-auto flex w-72 flex-col items-center">
          <UIToolKit />
          <div className="space-y-6 mt-4">
          <Button variant="default" className="w-full py-3 rounded-lg text-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white" onClick={() => router.push(`/call/test`)}>
          Join Call
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col justify-center items-center space-y-4 mt-6">
          <div className="flex justify-center w-full space-x-4 bg-white p-6 rounded-lg shadow-2xl border border-gray-300">
          <MicButton client={client} isAudioMuted={isAudioMuted} setIsAudioMuted={setIsAudioMuted} />
          <CameraButton client={client} isVideoMuted={isVideoMuted} setIsVideoMuted={setIsVideoMuted} renderVideo={renderVideo} />
            <TranscriptionButton setTranscriptionSubtitle={setTranscriptionSubtitle} client={client} />
            <RecordingButton client={client} />
            <SettingsModal client={client} />
            <ActionModal />
            <Button variant="secondary" className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2 text-white" onClick={leaveCall} title="Leave Call">
              <PhoneOff className="w-5 h-5" />
              <span>Leave</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

type VideoCallProps = {
  jwt: string;
  session: string;
  isCreator: boolean;
  setTranscriptionSubtitle: setTranscriptionType;
  setRecords: React.Dispatch<React.SetStateAction<ChatRecord[]>>;
  client: MutableRefObject<typeof VideoClient>;
  inCall: boolean;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
};

export default Videocall;