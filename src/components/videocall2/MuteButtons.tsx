import { type Dispatch, type MutableRefObject, type SetStateAction } from "react";
import { Button } from "components/ui/button";
import type { VideoClient } from "@zoom/videosdk";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

// MicButton for toggling microphone
const MicButton = (props: { client: MutableRefObject<typeof VideoClient>; isAudioMuted: boolean; setIsAudioMuted: Dispatch<SetStateAction<boolean>> }) => {
  const { client, isAudioMuted, setIsAudioMuted } = props;

  const onMicrophoneClick = async () => {
    const mediaStream = client.current.getMediaStream();
    if (isAudioMuted) {
      await mediaStream?.unmuteAudio(); // Unmute the audio
      setIsAudioMuted(false); // Update state
    } else {
      await mediaStream?.muteAudio(); // Mute the audio
      setIsAudioMuted(true); // Update state
    }
  };

  return (
    <Button onClick={onMicrophoneClick} variant={"outline"} title="microphone">
      {isAudioMuted ? <MicOff /> : <Mic />}
    </Button>
  );
};

// CameraButton for toggling camera
const CameraButton = (props: {
  client: MutableRefObject<typeof VideoClient>;
  isVideoMuted: boolean;
  setIsVideoMuted: Dispatch<SetStateAction<boolean>>;
  renderVideo: (event: { action: "Start" | "Stop"; userId: number }) => Promise<void>;
}) => {
  const { client, isVideoMuted, setIsVideoMuted, renderVideo } = props;

  const onCameraClick = async () => {
    const mediaStream = client.current.getMediaStream();
    if (isVideoMuted) {
      await mediaStream.startVideo(); // Start the video
      setIsVideoMuted(false); // Update state
      await renderVideo({ action: "Start", userId: client.current.getCurrentUserInfo().userId }); // Attach video
    } else {
      await mediaStream.stopVideo(); // Stop the video
      setIsVideoMuted(true); // Update state
      await renderVideo({ action: "Stop", userId: client.current.getCurrentUserInfo().userId }); // Detach video
    }
  };

  return (
    <Button onClick={onCameraClick} variant={"outline"} title="camera">
      {isVideoMuted ? <VideoOff /> : <Video />}
    </Button>
  );
};

export { MicButton, CameraButton };
