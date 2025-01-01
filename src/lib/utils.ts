import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { type VideoClient } from "@zoom/videosdk";
import { useCallback, useRef, type CSSProperties } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Addition

export const videoCallStyle = {
  height: "85vh", // Slightly reduced for better proportion
  width: "100%", // Full width to ensure responsive layout
  marginTop: "2rem", // Increase the top margin to balance with other UI elements
  marginLeft: "auto", // Automatically adjust the left margin to center it
  marginRight: "auto", // Automatically adjust the right margin to center it
  padding: "1rem", // Add padding for some inner spacing
  borderRadius: "20px", // Increase border radius for a softer, more elegant look
  backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent white for light theme
  display: "flex", // Flexbox layout to center the video player if needed
  justifyContent: "center", // Center the video content horizontally
  alignItems: "center", // Center the video content vertically
  overflow: "hidden", // Ensures the video player doesn't spill outside the container
  transition: "all 0.3s ease", // Smooth transition when resizing or adjusting
} as CSSProperties


// For safari desktop browsers, you need to start audio after the media-sdk-change event is triggered
export const WorkAroundForSafari = async (client: typeof VideoClient) => {
  let audioDecode: boolean;
  let audioEncode: boolean;
  client.on("media-sdk-change", (payload) => {
    console.log("media-sdk-change", payload);
    if (payload.type === "audio" && payload.result === "success") {
      if (payload.action === "encode") {
        audioEncode = true;
      } else if (payload.action === "decode") {
        audioDecode = true;
      }
      if (audioEncode && audioDecode) {
        console.log("start audio");
        void client.getMediaStream().startAudio();
      }
    }
  });
};
