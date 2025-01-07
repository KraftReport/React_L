import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [otp, setOtp] = useState<string>('');
  const [playbackInfo, setPlaybackInfo] = useState<string>('');
  const videoId = 'be6afd168ad44a23b138e5dca9af4669'; // Replace with your video ID

  useEffect(() => {
    let isMounted = true; // Track if component is mounted

    const fetchOtp = async () => {
      try { 
        const formData = new FormData();
        formData.append('videoId', videoId);
        const response = await axios.post('https://localhost:44370/api/stream/otp',  
         formData,
         {headers : {'Content-Type' : 'multipart/form-data'}}
        );

        if (isMounted) { // Only update state if the component is still mounted
          const { otp, playbackInfo } = response.data;
          console.log(response.data)
          setOtp(otp);
          setPlaybackInfo(playbackInfo);
        }
      } catch (error) {
        console.error('Error fetching OTP:', error);
      }
    };

    fetchOtp();

    return () => {
      isMounted = false; // Clean up on unmount
    };
  }, [videoId]);

  useEffect(() => {
    if (otp && playbackInfo) {
      // Initialize VdoCipher player
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const player = new (window as any).VdoPlayer({
        otp,
        playbackInfo,
        container: document.getElementById('vdo-player'),
        theme: '9ae8bbe8dd964ddc9bdb932cca1cb59a',
      });
      player.addEventListener('load', () => console.log('Player Loaded'));
    }
  }, [otp, playbackInfo]);

  return (
    <div className="App">
      <h1>Video Streaming App</h1>
      <div id="vdo-player" style={{ width: '640px', height: '360px' }}></div>
    </div>
  );
};

export default App;
