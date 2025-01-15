
import LoginForm from "./components/LoginForm"
import { BrowserRouter as Router,Switch,Route, Link } from "react-router-dom"
import Dashboard from "./components/Dashboard"

const App : React.FC =() => { 

  return (
    <> 
    <Router>
      <Link to="dash">dash</Link>
      <Link to="/">authenticate</Link>
      <Switch>

        <Route  path="/" component={LoginForm}></Route>
        <Route path="/dash" component={Dashboard} ></Route>
      </Switch>
    </Router> 
    </>
  )
}

export default App

