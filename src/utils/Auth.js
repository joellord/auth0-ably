import Auth0 from "auth0-js";
import AUTH0_CONFIG from "./Auth.config";
import * as Ably from "./Ably";
import store from "./Store";

const auth0 = new Auth0.WebAuth(AUTH0_CONFIG);

export function login() {
  auth0.authorize();
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("id_token");
}

export function handleAuth() {
  auth0.parseHash(window.location.hash, (err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      window.location.hash = "";
      localStorage.setItem("token", authResult.accessToken);
      localStorage.setItem("id_token", authResult.idToken);
      Ably.initialize();
      store.updateGlobalState({isLoggedIn: true});
    } else if (err) {
      console.error(`Error: ${err.error}`);
    }
  });
}