import axios from "axios"
import { useEffect, useState } from "react"
import { useVideoIdUploadContext } from "../Context"

const Uploader : React.FC = () => {
    const [file,setFile] = useState<File | null>(null)
    const [title,setTitle] = useState<string>("") 
    const {videoId,uploadVideoId} = useVideoIdUploadContext()

    const handleFormFile = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]

        if(selectedFile){
            setFile(selectedFile)
            setTitle(selectedFile.name)
        }  
    }

    const handleSubmit = async(event:React.FormEvent) => {
        event.preventDefault()
        const response = await axios.post('https://localhost:44370/api/stream/upload',
            {'title':title,'file':file},
            {headers : {'Content-Type' : 'multipart/form-data'}}
        ) 
        await uploadVideoId(response.data)
        console.log(response.data)
        console.log(videoId) 
    }

    useEffect(()=>{
        console.log(videoId)
    },[videoId])
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input onChange={handleFormFile} type="file"/>
                <button type="submit">Upload</button>
            </form>
        </>)
}

export default Uploader