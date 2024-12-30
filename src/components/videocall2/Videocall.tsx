import { type MutableRefObject, useRef, useState } from "react";
import { type VideoClient, VideoQuality, type VideoPlayer, type ChatMessage } from "@zoom/videosdk";
import { PhoneOff } from "lucide-react";
import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";
import { type ChatRecord } from "components/chat/Chat";
import { WorkAroundForSafari } from "utils/safari";
import { videoCallStyle } from "lib/utils";
import SettingsModal from "./SettingsModal";
import ActionModal from "./ActionModal";
import { type setTranscriptionType } from "./Transcript";
import UIToolKit from "./UIToolKit";
import TranscriptionButton from "./TranscriptionButton";
import RecordingButton from "./RecordingButton";
import { CameraButton, MicButton } from "./MuteButtons";
import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";

// Hardcoded user data
const userData = {
  user: {
    id: "user1",
    name: "John Doe",
  },
};

// Hardcoded room data
const roomData = {
  id: "room1",
  title: "Team Meeting",
  content: "Discussion about the upcoming project deadlines.",
  time: new Date().toISOString(),
  duration: 60,
  jwt: "fake-jwt-token", // Hardcoded JWT
  session: "room1-session-id", // Hardcoded Session ID
};

const Videocall = (props: VideoCallProps) => {
  const { setTranscriptionSubtitle, isCreator, jwt, session, client } = props;
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [inCall, setInCall] = useState(false); // Local state for inCall
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  const init = async () => {
    await client.current.init("en-US", "Global", { patchJsMedia: true });
    client.current.on("peer-video-state-change", (payload) => void renderVideo(payload));
    client.current.on("chat-on-message", onChatMessage);
    await client.current.join(session, jwt, userData.user.name).catch((e) => {
      console.log(e);
    });
    if (isCreator) {
      // For now, we'll skip the mutation since we aren't using the actual API
      // In real case, we would call `writeZoomSessionID.mutateAsync` here
      console.log("Room session ID saved:", client.current.getSessionInfo().sessionId);
    }
  };

  const startCall = async () => {
    toast({ title: "Joining", description: "Please wait..." });
    setInCall(true); // Set inCall state to true only after joining the call
    await client.current.init("en-US", "Global", { patchJsMedia: true });
    client.current.on(
      "peer-video-state-change",
      (payload) => void renderVideo(payload)
    );

    try {
      await init(); // This will join the session
      setInCall(true); // Set inCall state to true only after joining the call
      const mediaStream = client.current.getMediaStream();
      await mediaStream.startVideo();
      await renderVideo({
        action: "Start",
        userId: client.current.getCurrentUserInfo().userId,
      });
    } catch (error) {
      console.error("Error during start call:", error);
      toast({ title: "Error", description: "Unable to start the call. Please try again.", variant: "destructive" });
    }

    const mediaStream = client.current.getMediaStream();
    // @ts-ignore
    window.safari ? await WorkAroundForSafari(client.current) : await mediaStream.startAudio();
    setIsAudioMuted(client.current.getCurrentUserInfo().muted ?? true);
    await mediaStream.startVideo();
    setIsVideoMuted(false);
    await renderVideo({ action: "Start", userId: client.current.getCurrentUserInfo().userId });
  };

  const renderVideo = async (event: { action: "Start" | "Stop"; userId: number }) => {
    const mediaStream = client.current.getMediaStream();
    if (event.action === "Stop") {
      const element = await mediaStream.detachVideo(event.userId);
      Array.isArray(element)
        ? element.forEach((el) => el.remove())
        : element.remove();
    } else {
      const userVideo = await mediaStream.attachVideo(
        event.userId,
        VideoQuality.Video_720P
      );
      const videoContainer = document.createElement("div");

      videoContainer.appendChild(userVideo as VideoPlayer);

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
    setInCall(false); // Set inCall to false when leaving
    window.location.href = "/";
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col rounded-md px-4">
      <div className="flex w-full flex-1" style={inCall ? {} : { display: "none" }}>
        {/* @ts-expect-error html component */}
        <video-player-container ref={videoContainerRef} style={videoCallStyle} />
      </div>
      {!inCall ? (
        <div className="mx-auto flex w-64 flex-col self-center">
          <UIToolKit />
          <div className="w-4" />
          <Button className="flex flex-1" onClick={startCall}>
            Join
          </Button>
        </div>
      ) : (
        <div className="flex w-full flex-col justify-around self-center">
          <div className="mt-4 flex w-[30rem] flex-1 justify-around self-center rounded-md bg-white p-4">
            <CameraButton 
              client={client} 
              isVideoMuted={isVideoMuted} 
              setIsVideoMuted={setIsVideoMuted} 
              renderVideo={renderVideo} 
            />
            <MicButton 
              isAudioMuted={isAudioMuted} 
              client={client} 
              setIsAudioMuted={setIsAudioMuted} 
            />
            <TranscriptionButton 
              setTranscriptionSubtitle={setTranscriptionSubtitle} 
              client={client} 
            />
            <RecordingButton client={client} />
            <SettingsModal client={client} />
            <ActionModal />
            <Button variant={"destructive"} onClick={leaveCall} title="leave call">
              <PhoneOff />
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
};

export default Videocall;
