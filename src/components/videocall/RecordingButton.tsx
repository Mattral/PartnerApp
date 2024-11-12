import { type MutableRefObject, useRef, useState, useEffect } from "react";
import { Button } from "components/ui/button";
import { RecordingStatus } from "@zoom/videosdk";
import type { RecordingClient, VideoClient } from "@zoom/videosdk";
import { CircleDotIcon, CircleSlash2 } from "lucide-react";

const RecordingButton = (props: { client: MutableRefObject<typeof VideoClient> }) => {
  const { client } = props;
  const [isRecording, setIsRecording] = useState<RecordingStatus>(RecordingStatus.Stopped);

  // Using useRef to store the recording client instance
  const recordingClient = useRef<typeof RecordingClient>(client.current.getRecordingClient());
  useEffect(() => {
    // Ensure that recordingClient is set up once the client is ready
    recordingClient.current = client.current.getRecordingClient();

    // Fetch initial recording status
    if (recordingClient.current) {
      setIsRecording(recordingClient.current.getCloudRecordingStatus());
    }
  }, [client]);

  const onRecordingClick = async () => {
    if (!recordingClient.current) return;

    try {
      if (recordingClient.current.getCloudRecordingStatus() === RecordingStatus.Recording) {
        await recordingClient.current.stopCloudRecording();
      } else {
        await recordingClient.current.startCloudRecording();
      }

      // After starting or stopping, we update the recording status
      setIsRecording(recordingClient.current.getCloudRecordingStatus());
    } catch (error) {
      console.error("Error managing recording:", error);
    }
  };

  return (
    <Button
      onClick={onRecordingClick}
      variant={isRecording === RecordingStatus.Recording ? "destructive" : "outline"}
      className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full"
      title={isRecording === RecordingStatus.Recording ? "Stop Recording" : "Start Recording"}
    >
      <span className="text-lg">
        {isRecording === RecordingStatus.Recording ? <CircleSlash2 /> : <CircleDotIcon />}
      </span>
      <span className="text-sm font-medium">
        {isRecording === RecordingStatus.Recording ? "Stop Recording" : "Start Recording"}
      </span>
    </Button>
  );
};

export default RecordingButton;


//  const recordingClient = useRef<typeof RecordingClient>(client.current.getRecordingClient());
