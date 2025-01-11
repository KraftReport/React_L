import React from "react";

interface Props {
    otp : string
    playbackInfo : string
}

const Player : React.FC<Props> = ({otp,playbackInfo}) => {

    console.log(otp)
    console.log(playbackInfo)
    return(
        <>
    <iframe
      src={`https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}&primaryColor=4245EF`}
      frameBorder="0"
      allow="encrypted-media"
      allowFullScreen
    ></iframe>
        </>
    )

}

export default Player