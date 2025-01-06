import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";  

const LoginForm : React.FC  = () => {


    

    const handleSuccess = async (response: { credential?: string }) => {
        
        if(response.credential){
            const id = response.credential
            console.log(id)

            try {
            const response = await axios.post(
                'http://localhost:8080/api/auth/authenticate',
                {'token':id},
                {headers : {'Content-Type' : 'multipart/form-data'}}
            )
            console.log(response)
            } catch (error) {
                console.error(error)
            }
        } 
        console.error('response is not contain tokenId') 
    }

    const handleError = () => {
        console.error("oauth fail")
    }

    return(
        <>
        <div> 

        <GoogleLogin
            onSuccess={handleSuccess} onError={handleError} 
            />   

        </div>
     
        </>
    )
}

export default LoginForm