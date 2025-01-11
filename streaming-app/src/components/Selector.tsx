import axios from "axios";
import React, { useEffect, useState } from "react";
import Player from "./Player";
import { useVideoIdUploadContext } from "../Context";

 
const Selector :React.FC =  () => {

    const [otp,setOtp] = useState<string>("")
    const [playbackInfo,setPlaybackInfo] = useState<string>("")
    const [loading,setIsLoading] = useState<boolean>(true)
    const {videoId,uploadVideoId} = useVideoIdUploadContext()
    uploadVideoId("fabef32dff8c42fb97f38b243490da03") 
    useEffect(()=>{
        const fetchOtpAndPlaybackInfo = async () => {
            const response = await axios.post( "https://localhost:44370/api/stream/otp",
            {"videoId":videoId},
            {headers : { "Content-Type": "multipart/form-data" }}) 
            const data = response.data
            if(data){ 
                setOtp(data.otp)
                setPlaybackInfo(data.playbackInfo)
                setIsLoading(false)
                console.log(loading)
            } 
        }
        fetchOtpAndPlaybackInfo()
    },[videoId])

    return(
        <>
        <div>
            {!loading ? <Player otp={otp} playbackInfo={playbackInfo}/> : <div></div>}
        </div>
        </>
    )

}

export default Selector