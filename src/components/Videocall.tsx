"use client";

import { useRef, useState, useEffect } from "react";
import ZoomVideo, { VideoClient, VideoQuality, VideoPlayer } from "@zoom/videosdk";
import { CameraButton, MicButton } from "./MuteButtons";
import { WorkAroundForSafari } from "lib/utils";
import { PhoneOff } from "lucide-react";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogTitle,
} from "@mui/material";
import ChatPopup from "./ChatPopup"; // Existing chat component
import { styled } from "@mui/material/styles";

import { videoCallStyle } from "lib/utils";
import SettingsModal from "components/videocall/SettingsModal";
import ActionModal from "components/videocall/ActionModal";
import UIToolKit from "components/videocall2/UIToolKit";
import TranscriptionButton from "components/videocall2/TranscriptionButton";
import RecordingButton from "components/videocall2/RecordingButton";
import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

const ChatButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: "0.5rem 1rem", // Adjust padding for better touch response on mobile
  "@media (max-width: 768px)": {
    width: "100%", // Full width on smaller screens
  },
}));


const Videocall = ({ slug, JWT }: { slug: string; JWT: string }) => {
  const session = slug;
  const jwt = JWT;
  const client = useRef<typeof VideoClient>(ZoomVideo.createClient());

  const [inCall, setinCall] = useState(false);

  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const [userName, setUserName] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); // State for chat popup
  const [elapsedTime, setElapsedTime] = useState(0); // State for elapsed time
  const [transcriptionSubtitle, setTranscriptionSubtitle] = useState({});


  useEffect(() => {
    if (!userName) {
      setUserName("User-1");
    }
    if (userName) {
      joinCall();
    }
  }, [userName]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (inCall) {
      timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [inCall]);


  // Handles the active-share-change event
  const handleShareChange = (payload: { state: string; userId: number }) => {
    const canvas = document.querySelector("#users-screen-share-content-canvas") as HTMLCanvasElement;
    const mediaStream = client.current.getMediaStream();

    if (payload.state === "Active") {
      // Start showing the shared screen on the canvas
      mediaStream.startShareView(canvas, payload.userId);
    } else if (payload.state === "Inactive") {
      // Stop showing the shared screen when the user stops sharing
      mediaStream.stopShareView();
    }
  };

  // Start screen share
  const startScreenShare = async () => {
    const videoElement = document.querySelector('#my-screen-share-content-video') as HTMLVideoElement | null;
    const canvasElement = document.querySelector('#my-screen-share-content-canvas') as HTMLCanvasElement | null;
    const userElement = document.querySelector('#users-screen-share-content-canvas') as HTMLCanvasElement | null;

    const mediaStream = client.current.getMediaStream();

    if (videoElement) {
      // Add the video element to the video container
      videoContainerRef.current?.appendChild(videoElement);
      await mediaStream.startShareScreen(videoElement);
      console.log("video share")
    } else if (canvasElement) {
      // Add the canvas element to the video container
      videoContainerRef.current?.appendChild(canvasElement);
      await mediaStream.startShareScreen(canvasElement);
      console.log("canvas share")
    } else if (userElement) {
      // Add the canvas element to the video container
      videoContainerRef.current?.appendChild(userElement);
      console.log("user share")
    } else {
      console.error("No video or canvas element found for screen sharing.");
    }
  };

  // Stop screen share
  const stopScreenShare = async () => {
    const mediaStream = client.current.getMediaStream();
    await mediaStream.stopShareScreen();

    // Optionally, you can remove the video or canvas element after stopping the share
    const videoElement = document.querySelector('#my-screen-share-content-video') as HTMLVideoElement | null;
    const canvasElement = document.querySelector('#my-screen-share-content-canvas') as HTMLCanvasElement | null;

    if (videoElement) videoElement.remove();
    if (canvasElement) canvasElement.remove();
  };

  const joinCall = async () => {
    console.log("Joining session...");
    await client.current.init("en-US", "Global", { patchJsMedia: true });
    client.current.on(
      "peer-video-state-change",
      (payload) => void renderVideo(payload)
    );
    client.current.on("active-share-change", (payload) => handleShareChange(payload));


    try {
      await client.current.join(session, jwt, userName);

      setinCall(true);
      const mediaStream = client.current.getMediaStream();
      //@ts-expect-error
      window.safari
        ? await WorkAroundForSafari(client.current)
        : await mediaStream.startAudio();

      setIsAudioMuted(false);
      await mediaStream.startVideo();
      setIsVideoMuted(false);

      await renderVideo({
        action: "Start",
        userId: client.current.getCurrentUserInfo().userId,
      });
    } catch (e) {
      console.log("Join error:", e);
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
      videoContainerRef.current!.appendChild(userVideo as VideoPlayer);

    }
  };

  const leaveSession = async () => {
    client.current.off("peer-video-state-change", (payload) =>
      void renderVideo(payload)
    );

    await client.current.leave();
    window.location.href = "/session";
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
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
    <div className="flex flex-col h-auto min-h-screen w-full rounded-md px-6 bg-gradient-to-r from-white via-gray-100 to-gray-200 overflow-auto sm:px-4 lg:px-8 md:w-3/4">

      <div className={`flex w-full flex-1 ${inCall ? "block" : "hidden"}`}>
        {/* Video Player Container */}
        {/* @ts-expect-error html component */}
        <video-player-container ref={videoContainerRef} className="rounded-lg shadow-xl" style={videoCallStyle} />
        {/* The video or canvas element will be dynamically injected here based on the screen share */}
        <video id="my-screen-share-content-video" style={{ display: "none" }} height="1080" width="1920"></video>
        <canvas id="my-screen-share-content-canvas" style={{ display: "none" }} height="1080" width="1920"></canvas>
        <canvas id="users-screen-share-content-canvas" style={{ display: "none" }} height="1080" width="1920"></canvas>

      </div>


      {!inCall ? (
        <div className="mx-auto flex w-64 flex-col self-center">
          <UIToolKit />
          <div className="w-4" />
          <Button className="flex flex-1" onClick={joinCall}>
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
            <Button variant={"destructive"} onClick={leaveSession} title="leave call">
              <PhoneOff />
            </Button>
            <Button onClick={startScreenShare}>Start Screen Share</Button>
            <Button onClick={stopScreenShare}>Stop Screen Share</Button>
          </div>
        </div>
      )}

      {/* Chat Popup Toggle Button */}
      {inCall && (
        <ChatButton onClick={() => setIsChatOpen(!isChatOpen)}>
          {isChatOpen ? "Close Chat" : "Open Chat"}
        </ChatButton>
      )}


      {/* Chat Popup */}
      {inCall && isChatOpen && (
        <ChatPopup onClose={() => setIsChatOpen(false)} userName={userName} />
      )}

      {/* Time Counter Display */}
      {inCall && (
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#333' }}>Elapsed Time: {formatTime(elapsedTime)}</DialogTitle>
      )}

    </div>
  );
};

export default Videocall;


// to show name
// <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#333' }}>Session: {session}</DialogTitle>

/*



      {inCall && (
        <ButtonGroup>
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

          <Button onClick={leaveSession}>
            <PhoneOff />
          </Button>

        </ButtonGroup>
      )}

*/