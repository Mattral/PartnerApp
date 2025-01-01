"use client"
import { type MutableRefObject, useRef, useState } from "react";
import { type VideoClient, VideoQuality, type VideoPlayer } from "@zoom/videosdk";
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
import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import ZoomVideo from "@zoom/videosdk";

// Hardcoded user data
const userData = {
  user: {
    id: "user1",
    name: "John Doe",
  },
};


const Videocall = ({ slug, JWT }: { slug: string; JWT: string }) => {
  const session = slug;
  const jwt = JWT;
  const client = useRef(ZoomVideo.createClient());
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [inCall, setInCall] = useState(false); // Local state for inCall

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [transcriptionSubtitle, setTranscriptionSubtitle] = useState({});
  const [records, setRecords] = useState<ChatRecord[]>([]);

  const { toast } = useToast();

  const init = async () => {
    await client.current.init("en-US", "Global", { patchJsMedia: true });
    client.current.on("peer-video-state-change", (payload) => void renderVideo(payload));
    await client.current.join(session, jwt, userData.user.name).catch((e) => {
      console.log(e);
    });
    /*
    if (isCreator) {
      // For now, we'll skip the mutation since we aren't using the actual API
      // In real case, we would call `writeZoomSessionID.mutateAsync` here
      console.log("Room session ID saved:", client.current.getSessionInfo().sessionId);
    }
      */
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

  const leaveCall = async () => {
    toast({ title: "Leaving", description: "Please wait..." });
    client.current.off("peer-video-state-change", (payload: { action: "Start" | "Stop"; userId: number }) => void renderVideo(payload));
    await client.current.leave().catch((e) => console.log("leave error", e));
    setInCall(false); // Set inCall to false when leaving
    window.location.href = "/";
  };

  // MicButton component code
  const onMicrophoneClick = async () => {
    const mediaStream = client.current.getMediaStream();
    if (isAudioMuted) {
      await mediaStream?.unmuteAudio();
      setIsAudioMuted(false);
    } else {
      await mediaStream?.muteAudio();
      setIsAudioMuted(true);
    }
  };

  // CameraButton component code
  const onCameraClick = async () => {
    const mediaStream = client.current.getMediaStream();
    if (isVideoMuted) {
      await mediaStream.startVideo();
      setIsVideoMuted(false);
      // You could call renderVideo({ action: "Start", userId: client.current.getCurrentUserInfo().userId }) here
    } else {
      await mediaStream.stopVideo();
      setIsVideoMuted(true);
      // You could call renderVideo({ action: "Stop", userId: client.current.getCurrentUserInfo().userId }) here
    }
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
            {/* Camera Button */}
            <Button onClick={onCameraClick} variant={"outline"} title="camera">
              {isVideoMuted ? <VideoOff /> : <Video />}
            </Button>

            {/* Mic Button */}
            <Button onClick={onMicrophoneClick} variant={"outline"} title="microphone">
              {isAudioMuted ? <MicOff /> : <Mic />}
            </Button>

            <TranscriptionButton setTranscriptionSubtitle={setTranscriptionSubtitle} client={client} />
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



export default Videocall;
