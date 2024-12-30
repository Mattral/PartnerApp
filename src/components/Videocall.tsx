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
import Transcription from "./Transcription"; // Import the transcription component

// Styled components for better visual aesthetics
const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
}));

const ButtonGroup = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  maxWidth: "500px",
  marginTop: theme.spacing(2),
  flexWrap: "wrap",
}));

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
  const [inSession, setInSession] = useState(false);
  const [userName, setUserName] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); // State for chat popup
  const [elapsedTime, setElapsedTime] = useState(0); // State for elapsed time
  const [showTranscription, setShowTranscription] = useState(false); // Controls transcription visibility

  const client = useRef<typeof VideoClient>(ZoomVideo.createClient());
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  useEffect(() => {
    if (!userName) {
      setUserName("User-1");
    }
    if (userName) {
      joinSession();
    }
  }, [userName]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (inSession) {
      timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [inSession]);

  const joinSession = async () => {
    console.log("Joining session...");
    await client.current.init("en-US", "Global", { patchJsMedia: true });
    client.current.on(
      "peer-video-state-change",
      (payload) => void renderVideo(payload)
    );

    try {
      await client.current.join(session, jwt, userName);
      setInSession(true);
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

      // Create a container for video and username
      const videoContainer = document.createElement("div");
      videoContainer.style.position = "relative";
      videoContainer.style.textAlign = "center"; // Center username under video

      // Append the video to the container
      videoContainer.appendChild(userVideo as VideoPlayer);

      // Create a div for the username
      const userNameDiv = document.createElement("div");
      userNameDiv.innerText = userName; // Use the current userName
      userNameDiv.style.color = "white";
      userNameDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      userNameDiv.style.padding = "5px";
      userNameDiv.style.position = "absolute";
      userNameDiv.style.bottom = "0"; // Position it below the video
      userNameDiv.style.width = "100%";
      userNameDiv.style.textAlign = "center"; // Center text

      // Append the username below the video
      videoContainer.appendChild(userNameDiv);

      // Append the container to the video container ref
      videoContainerRef.current!.appendChild(videoContainer);
    }
  };

  const leaveSession = async () => {
    client.current.off("peer-video-state-change", (payload) =>
      void renderVideo(payload)
    );

    await client.current.leave();
    window.location.href = "/";
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <Container>

      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#333' }}>Session: {session}</DialogTitle>
      {/* @ts-expect-error html component */}
      <video-player-container ref={videoContainerRef} />

      {/* Time Counter Display */}
      {inSession && (
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#333' }}>Elapsed Time: {formatTime(elapsedTime)}</DialogTitle>
      )}

      {inSession && (
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
          <Button onClick={() => setShowTranscription(!showTranscription)}>
            {showTranscription ? "Hide Transcription" : "Show Transcription"}
          </Button>

        </ButtonGroup>
      )}

      {/* Chat Popup Toggle Button */}
      {inSession && (
        <ChatButton onClick={() => setIsChatOpen(!isChatOpen)}>
          {isChatOpen ? "Close Chat" : "Open Chat"}
        </ChatButton>
      )}

      {/* Conditionally Render Transcription Text */}
      {inSession && showTranscription && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            width: "100%",
            maxWidth: "500px", // Limit width for wrapping
            marginBottom: "2rem",
            whiteSpace: "normal", // Allow wrapping
            wordBreak: "break-word", // Wrap long words to the next line if necessary
            fontSize: "1rem", // Adjust font size as needed
          }}
        >
          <Transcription userName={userName} />
        </div>
      )}

      {/* Chat Popup */}
      {inSession && isChatOpen && (
        <ChatPopup onClose={() => setIsChatOpen(false)} userName={userName} />
      )}
    </Container>
  );
};

export default Videocall;

