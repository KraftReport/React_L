import Selector from "./components/Selector";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Uploader from "./components/Uploader";

const App: React.FC = () => {
  return (
    <div>
      App
      <Router>
        <div>
          <ul>
            <li><Link to="/upload">Upload</Link></li>
            <li><Link to="/selector">Watch</Link></li>
          </ul>
        </div>
        <Switch>
          <Route path="/upload" component={Uploader} />
          <Route path="/selector" component={Selector} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
