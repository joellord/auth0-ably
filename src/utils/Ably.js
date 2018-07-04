import store from "./Store";

let realtime;
let channel;

export function initialize() {
  let Ably = window.Ably;
  let lastMessages = [];
  realtime = new Ably.Realtime({
    authUrl: 'http://localhost:5000/auth',
    authHeaders: {
      "ably-authorization": `Bearer ${localStorage.getItem("id_token")}`
    }
  });
  realtime.connection.once('connected', function () {
    console.log("Client connected to Ably using JWT");
    channel = realtime.channels.get('auth0-ably');

    channel.subscribe("main", (msg) => {
      lastMessages.push(msg);
      store.updateGlobalState({chatMessages: lastMessages});
    });
  });
}

export function publish(msg) {
  if (!channel) return console.log("Channel is not opened yet");
  channel.publish("main", msg);
}

