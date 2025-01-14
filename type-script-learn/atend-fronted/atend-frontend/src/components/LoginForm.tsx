import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";  
import { useTokenContext } from "../share/TokenContext";

const LoginForm : React.FC  = () => {

    const {setToken} = useTokenContext()
 
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
            console.log("this is token-------->",response.data)
            setToken(response.data)
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