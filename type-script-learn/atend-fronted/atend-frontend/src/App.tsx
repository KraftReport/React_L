import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginComponent from "./components/LoginComponent";
import UserList from "./components/UserList";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App: React.FC = () => {

    const clientId : string = '1069095628455-1uolcr1igmt45p9h0c4h61a7ksk7nkg7.apps.googleusercontent.com'

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>   
      <Router>
        <div>
          <ul>
            <li>
            <Link to="/list">User List</Link>
            </li>
            <li>
            <Link to="/dash">Dashboard</Link>
            </li>
            <li>
            <Link to="/">Authenticate</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path="/list" component={UserList}/>
          <Route path="/dash" component={Dashboard} />
          <Route path="/" component={LoginComponent} />
        </Switch>
      </Router>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
