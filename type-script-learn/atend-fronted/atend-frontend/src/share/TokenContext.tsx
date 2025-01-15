import React, { createContext, useContext, useState } from "react"

export interface TokenContextProps {
    token : string
    setToken : React.Dispatch<React.SetStateAction<string>>
}

export interface TokenProviderProps{
    children : React.ReactNode
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined)

export const TokenContextProvider : React.FC<TokenProviderProps>  = ({children})  =>{
    const [token,setToken] = useState<string>("")

    return(<TokenContext.Provider value={{token,setToken}}>
        {children}
    </TokenContext.Provider>) 
}

export const useTokenContext = () => {
    const context = useContext(TokenContext)
    if(!context){
        throw new Error("there is error in intializing token context")
    }
    return context
}