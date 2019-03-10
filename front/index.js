const API_URL = "http://localhost:8888";
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const sendBtn = document.querySelector("#sendMessage");

logoutBtn.addEventListener("click", (event) => {
  auth.logout();
  UIUpdate.loggedOut();
});

loginBtn.addEventListener("click", (event) => {
  auth.login();
});

sendBtn.addEventListener("click", (event) => {
  ably.publish(document.querySelector("input").value);
});