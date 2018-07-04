const ABLY_KEY = "m-fR3g.LZb34Q:tuuf50RTqK1kZLbw";
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const appId = ABLY_KEY.split(".")[0];
const keyId = ABLY_KEY.split(".")[1].split(":")[0];
const keySecret = ABLY_KEY.split(".")[1].split(":")[1];
const expiresIn = 60;

const app = express();

const pem = fs.readFileSync(__dirname + "/auth0-ably.pem");

app.use(cors());

const PORT = 5000;

app.get("/auth", (req, res) => {
  if (!req.headers["ably-authorization"]) {
    res.status(400).send("Authorization header not found");
    return;
  }
  let authToken = req.headers["ably-authorization"].split(" ")[1];
  let decodeOptions = {
    algorithms: ["RS256"]
  };

  let decoded = jwt.verify(authToken, pem, decodeOptions);

  const payload = Object.assign({}, {
    "x-ably-capability": JSON.stringify({
      "*": ["publish", "subscribe"]
    }),
    "x-ably-clientId": decoded.email
  });
  const options = {
    expiresIn,
    keyid: `${appId}.${keyId}`
  };

  jwt.sign(payload, keySecret, options, (err, tokenId) => {
    if (err) console.log(err);

    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(tokenId));
  });
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

