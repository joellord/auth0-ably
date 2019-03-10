# Auth0 Ably demo
A very simple application that uses Auth0 to protect a route to generate authorization tokens for Ably.  In addition to protecting the route, we are also using an ID token to get information about the connected user.

## Live Demo
You can check out the live demo using Webtask and a static file host at [Auth0-Playground/Ably](https://auth0-playground.com/ably/#)

# Setup

Start by adding your Auth0 configurations in `/front/config.js` and `/api/config.js`.

## Front end 
The front-end is in the `/front` folder.  You can start it with `serve` or any other static http server.

```
> npm install -g serve
> cd front
> serve
```

## API
The API is in the `/api` folder.  You can start it with `npm start`.  Make sure you run `npm install` first.

```
> cd api
> npm install
> npm start
```
