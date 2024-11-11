import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "./trpc";

// Mock of the `generateVideoSdkApiJwt` function.
const generateVideoSdkApiJwt = () => "mock-jwt-token";

// Mock of the room data
const mockRoomDatabase = {
  "room1": {
    id: "room1",
    zoomSessionsIds: ["session1", "session2"], // List of Zoom session IDs
  },
  "room2": {
    id: "room2",
    zoomSessionsIds: ["session3"],
  },
};

// Mocked Zoom recording data for the sessions
const ExampleRecordingJSON = {
  timezone: "UTC",
  duration: 1,
  session_id: "session1",
  session_name: "Test Session 1",
  start_time: "2022-02-01T19:12:01Z",
  total_size: 5686716,
  recording_count: 2,
  recording_files: [
    {
      id: "f0b0b02a-24e6-4b57-xx67-b14c03ba42c7",
      status: "completed",
      recording_start: "2022-02-01T19:13:02Z",
      recording_end: "2022-02-01T19:14:12Z",
      file_type: "MP4",
      file_size: 3477124,
      download_url: "https://mockurl.com/download1",
      recording_type: "shared_screen_with_speaker_view",
      file_extension: "MP4",
    },
    {
      id: "b5487b74-17a2-440e-93e7-d009db00c3cf",
      status: "completed",
      recording_start: "2022-02-01T19:13:02Z",
      recording_end: "2022-02-01T19:14:12Z",
      file_type: "M4A",
      file_size: 1104796,
      download_url: "https://mockurl.com/download2",
      recording_type: "audio_only",
      file_extension: "M4A",
    },
  ],
  participant_audio_files: [
    {
      id: "30306814-b919-41e7-9iit-e20ed2c7ab21",
      status: "completed",
      recording_start: "2022-02-01T19:13:02Z",
      recording_end: "2022-02-01T19:14:12Z",
      file_type: "M4A",
      file_size: 1104796,
      download_url: "https://mockurl.com/download_audio",
      file_name: "Audio Only - Test Session 1",
      file_extension: "M4A",
    },
  ],
};

// Main Router for Zoom sessions and recordings
export const zoomRouter = createTRPCRouter({
  // Fetch the latest recording for a given room
  getLatestRecording: protectedProcedure.input(z.object({ roomId: z.string() })).mutation(async ({ ctx, input }) => {
    const room = mockRoomDatabase[input.roomId];  // Simulate fetching room data from the database
    
    if (room) {
      const sessionId = room.zoomSessionsIds[room.zoomSessionsIds.length - 1];
      
      // Mock fetching the recording data from the Zoom API for the latest session
      const recordingData = ExampleRecordingJSON; // Using the mocked data directly

      if (recordingData) {
        return { status: "completed", data: recordingData };
      }

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error fetching recording" });
    }

    throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });
  }),

  // Fetch all recordings for a given room
  fetchAllRecordings: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const room = mockRoomDatabase[input.roomId];  // Simulate fetching room data from the database

      if (room) {
        const recordings = await Promise.all(
          room.zoomSessionsIds.map(async (sessionId) => {
            // Mock fetching each recording from the Zoom API using the sessionId
            const recordingData = ExampleRecordingJSON; // Using the mocked data directly

            if (recordingData) {
              return { status: "completed", data: recordingData };
            } else {
              throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error fetching recording" });
            }
          })
        );

        // Filter completed recordings and return the data
        const completed = getCompletedRecordings(recordings.filter((e) => e.status === "completed" && e.data !== null).map((e) => e.data));
        return completed;
      }

      throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });
    }),

  // Fetch all recordings and return them
  getAllRecordings: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      const room = mockRoomDatabase[input.roomId];  // Simulate fetching room data from the database

      if (room) {
        const recordings = await Promise.all(
          room.zoomSessionsIds.map(async (sessionId) => {
            // Mock fetching each recording from the Zoom API using the sessionId
            const recordingData = ExampleRecordingJSON; // Using the mocked data directly

            if (recordingData) {
              return { status: "completed", data: recordingData };
            } else {
              throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error fetching recording" });
            }
          })
        );

        // Filter completed recordings and return the data
        const completed = getCompletedRecordings(recordings.filter((e) => e.status === "completed" && e.data !== null).map((e) => e.data));
        return completed;
      }

      throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });
    }),
});

// Helper function to filter and return completed recordings
const getCompletedRecordings = (recordings: (typeof ExampleRecordingJSON | null)[]) => {
  return recordings as (typeof ExampleRecordingJSON)[]; // Casting to non-nullable type
};
