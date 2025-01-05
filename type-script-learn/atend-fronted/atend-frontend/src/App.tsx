
import { GoogleOAuthProvider } from "@react-oauth/google"
import LoginForm from "./components/LoginForm"

const App : React.FC =() => { 
const clientId : string = '1069095628455-1uolcr1igmt45p9h0c4h61a7ksk7nkg7.apps.googleusercontent.com'

  return (
    <>
    <GoogleOAuthProvider clientId={clientId}> 
    <LoginForm/>
    </GoogleOAuthProvider>
    </>
  )
}

export default App

