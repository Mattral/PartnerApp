import React from 'react';

const WebPageRenderer = ({ url, scale }) => {
  // Dummy authentication token
  const authToken = 'dummyAuthToken123';

  // Construct the URL with the auth token
  const urlWithToken = `${url}?token=${authToken}`;

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        width: '100%',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative', // For positioning the iframe
      }}
    >
      <iframe
        src={urlWithToken} // Use the constructed URL with the token
        title="External Web Page"
        style={{
          width: '125%', // Scale up to ensure the iframe covers the container
          height: '125%', // Scale up to ensure the iframe covers the container
          border: 'none',
          transform: `scale(${scale})`, // Scale based on the prop
          transformOrigin: 'center',
        }}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture; microphone; camera" // Allow video/audio playback
        allowFullScreen // Enables fullscreen
      />
    </div>
  );
};

export default WebPageRenderer;

/*
import React from 'react';

const WebPageRenderer = ({ url, scale }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        width: '100%',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative', // For positioning the iframe
      }}
    >
      <iframe
        src={url}
        title="External Web Page"
        style={{
          width: '125%', // Scale up to ensure the iframe covers the container
          height: '125%', // Scale up to ensure the iframe covers the container
          border: 'none',
          transform: `scale(${scale})`, // Scale based on the prop
          transformOrigin: 'center',
        }}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture; microphone; camera" // Allow video/audio playback
        allowFullScreen // Enables fullscreen
      />
    </div>
  );
};

export default WebPageRenderer;
*/