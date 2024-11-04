"use client"
// pages/index.tsx
import React from 'react';
import ZoomVideo from '@zoom/videosdk';
import ZoomContext from 'contexts/zoom-context'; // Make sure the path is correct
import App from './App'; // Adjust the import as necessary
import { devConfig } from 'config/dev';
import { b64DecodeUnicode, generateVideoToken } from 'utils/util';

const IndexPage: React.FC = () => {
  let meetingArgs: any = Object.fromEntries(new URLSearchParams(location.search));
  
  // Add enforceGalleryView to turn on the gallery view without SharedAddayBuffer
  if (!meetingArgs.sdkKey || !meetingArgs.topic || !meetingArgs.name || !meetingArgs.signature) {
    meetingArgs = { ...devConfig, ...meetingArgs };
  }

  // Decode base64 encoded fields
  if (meetingArgs.web && meetingArgs.web !== '0') {
    ['topic', 'name', 'password', 'sessionKey', 'userIdentity'].forEach((field) => {
      if (Object.hasOwn(meetingArgs, field)) {
        try {
          meetingArgs[field] = b64DecodeUnicode(meetingArgs[field]);
        } catch (e) {
          console.log('ignore base64 decode', field, meetingArgs[field]);
        }
      }
    });
    
    meetingArgs.role = meetingArgs.role ? parseInt(meetingArgs.role, 10) : 1;
  }

  meetingArgs.useVideoPlayer = 1;

  ['enforceGalleryView', 'enforceVB', 'cloud_recording_option', 'cloud_recording_election'].forEach((field) => {
    if (Object.hasOwn(meetingArgs, field)) {
      try {
        meetingArgs[field] = Number(meetingArgs[field]);
      } catch (e) {
        meetingArgs[field] = 0;
      }
    }
  });

  // Generate signature if necessary
  if (!meetingArgs.signature && meetingArgs.sdkSecret && meetingArgs.topic) {
    meetingArgs.signature = generateVideoToken(
      meetingArgs.sdkKey,
      meetingArgs.sdkSecret,
      meetingArgs.topic,
      meetingArgs.sessionKey,
      meetingArgs.userIdentity,
      Number(meetingArgs.role ?? 1),
      meetingArgs.cloud_recording_option,
      meetingArgs.cloud_recording_election,
      meetingArgs.telemetry_tracking_id || ''
    );
  }

  const zmClient = ZoomVideo.createClient();

  return (
    <ZoomContext.Provider value={zmClient}>
      <App meetingArgs={meetingArgs} />
    </ZoomContext.Provider>
  );
};

export default IndexPage;
