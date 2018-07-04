import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Home from "./components/Home";
import Callback from "./components/Callback";

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={props => <Home {...this.props} />} />
              <Route path="/callback" render={props => <Callback {...this.props} />} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
