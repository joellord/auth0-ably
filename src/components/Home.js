import React, { Component } from "react";
import { login, logout } from "../utils/Auth";
import * as Ably from "../utils/Ably";
import store from "../utils/Store";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();

    this.sendMessage = this.sendMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  getInitialState() {
    return store.getGlobalState()
  }

  componentWillMount() {
    store.subscribe(this.updateState);
  }

  componentWillUnmount() {
    store.unsubscribe(this.updateState);
  }

  updateState() {
    this.setState(store.getGlobalState());
  }

  sendMessage() {
    Ably.publish(this.state.message);
  }

  editMessage(ev) {
    store.updateGlobalState({message: ev.target.value})
  }

  logout() {
    logout();
    store.updateGlobalState({isLoggedIn: false});
  }

  render() {
    let chatRows = [];
    for (let i = this.state.chatMessages.length - 1; i >= 0; i--) {
      chatRows.push(
          <div key={i} className="row">
            <div className="col-4 said">{this.state.chatMessages[i].clientId} said:</div>
            <div className="col-8">{this.state.chatMessages[i].data}</div>
          </div>
      )
    }

    return (
        <div className="container">
          <section className="jumbotron">
            <h1>Auth0-Ably Demo</h1>
            <p>
              Build a chat system that uses Ably's realtime API and Auth0's authentication to manage
              user identity.
            </p>

            {this.state.isLoggedIn && (
                <div>
                  <div className="btn btn-danger btn-lg" onClick={this.logout}>
                    Logout
                  </div>
                </div>
            )}
            {!this.state.isLoggedIn && (
                <div className="btn btn-success btn-lg" onClick={login}>
                  Login
                </div>
            )}
          </section>

          {this.state.isLoggedIn &&
            <div>

              <div className="row">
                <div className="col-8 offset-2">
                  <input type="text" id="chatInput" value={this.state.message} onChange={this.editMessage}/>
                  <button type="button" className="btn btn-primary" id="sendBtn" onClick={this.sendMessage}>Send</button>
                </div>
              </div>

              <div className="row">
                <div className="col-8 offset-2">
                  <div className="" id="chatBox">
                    {chatRows}
                  </div>
                </div>
              </div>
            </div>
          }

        </div>
    );
  }
}