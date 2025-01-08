import React, { useEffect, useState } from "react";
import axios from "axios";
import Player from "./components/Player";

const App: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [playbackInfo, setPlaybackInfo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const videoId = "be6afd168ad44a23b138e5dca9af4669"; // Replace with your video ID

  // Fetch OTP and playback info
  useEffect(() => {
    let isMounted = true;

    const fetchOtp = async () => {
      try {
        const formData = new FormData();
        formData.append("videoId", videoId);

        const response = await axios.post(
          "https://localhost:44370/api/stream/otp",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (isMounted) {
          const  wow  = response.data;
          console.log(wow)
          setOtp(wow.otp);
          setPlaybackInfo(wow.playbackInfo);
          console.log("OTP:", otp);
          console.log("Playback Info:", playbackInfo);
          setIsLoading(false); // Set loading to false once data is fetched
        }
      } catch (error) {
        console.error("Error fetching OTP:", error);
        setIsLoading(false); // Ensure loading stops even if there's an error
      }
    };

    fetchOtp();

    return () => {
      isMounted = false;
    };
  }, [videoId]);

  return (
    <div className="App">
      <h1>Video Streaming App</h1>
      {isLoading ? (
        <p>Loading video player...</p>
      ) : otp && playbackInfo ? (
        <Player otp={otp} playbackInfo={playbackInfo} />
      ) : (
        <p>Failed to load video player. Please try again later.</p>
      )}
    </div>
  );
};

export default App;
