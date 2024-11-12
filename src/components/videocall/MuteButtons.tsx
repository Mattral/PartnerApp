import { type Dispatch, type MutableRefObject, type SetStateAction } from "react";
import { Button } from "components/ui/button";
import type { VideoClient } from "@zoom/videosdk";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

// MicButton Component
const MicButton = ({
  client,
  isAudioMuted,
  setIsAudioMuted,
}: {
  client: MutableRefObject<typeof VideoClient>;
  isAudioMuted: boolean;
  setIsAudioMuted: Dispatch<SetStateAction<boolean>>;
}) => {
  const onMicrophoneClick = async () => {
    const mediaStream = client.current.getMediaStream();
    if (!mediaStream) {
      console.error("Media stream is unavailable.");
      return;
    }

    try {
      if (isAudioMuted) {
        // Unmute audio
        await mediaStream.unmuteAudio();
        setIsAudioMuted(false);
      } else {
        // Mute audio
        await mediaStream.muteAudio();
        setIsAudioMuted(true);
      }
    } catch (error) {
      console.error("Error toggling microphone:", error);
    }
  };

  return (
    <Button onClick={onMicrophoneClick} variant="outline" title="microphone">
      {isAudioMuted ? <MicOff /> : <Mic />}
    </Button>
  );
};

// CameraButton Component
const CameraButton = ({
  client,
  isVideoMuted,
  setIsVideoMuted,
  renderVideo,
}: {
  client: MutableRefObject<typeof VideoClient>;
  isVideoMuted: boolean;
  setIsVideoMuted: Dispatch<SetStateAction<boolean>>;
  renderVideo: (event: { action: "Start" | "Stop"; userId: number }) => Promise<void>;
}) => {
  const onCameraClick = async () => {
    const mediaStream = client.current.getMediaStream();
    if (!mediaStream) {
      console.error("Media stream is unavailable.");
      return;
    }

    try {
      if (isVideoMuted) {
        // Start video stream
        await mediaStream.startVideo();
        setIsVideoMuted(false);
        await renderVideo({ action: "Start", userId: client.current.getCurrentUserInfo().userId });
      } else {
        // Stop video stream
        await mediaStream.stopVideo();
        setIsVideoMuted(true);
        await renderVideo({ action: "Stop", userId: client.current.getCurrentUserInfo().userId });
      }
    } catch (error) {
      console.error("Error toggling camera:", error);
    }
  };

  return (
    <Button onClick={onCameraClick} variant="outline" title="camera">
      {isVideoMuted ? <VideoOff /> : <Video />}
    </Button>
  );
};

export { MicButton, CameraButton };
