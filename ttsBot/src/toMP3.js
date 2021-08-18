// Twitch stuff
const tmi = require("twitch-auth-tmi");
const { StaticAuthProvider } = require("twitch-auth");

const authProvider = new StaticAuthProvider(
  "gp762nuuoqcoxypju8c569th9wz7q5",
  "v9kiavv3a70s9eu24cbj0nw2n80b5q"
);
const client = new tmi.Client({
  options: { debug: false },
  connection: {
    reconnect: true,
    secure: true,
  },
  authProvider: authProvider,
  channels: ["ax2s"],
});

client.connect().catch(console.error);

// Express + SSE
const express = require("express");
const SSE = require("express-sse");

const sse = new SSE([
  "array",
  "containing",
  "initial",
  "content",
  "(optional)",
]);

const app = express();
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use((req, res, next) => {
  console.log("got req");
  res.header({ "access-control-allow-origin": "*" });
  console.log(req.originalUrl);
  next();
});

let messageCount = 0;
app.get("/stream", (req, res) => {
  sse.init(req, res);
  res.send("hi");
});

sse.send("hi");

// client.on("message", (channel, tags, message, self) => {
//   console.log(tags["custom-reward-id"]);
//   if (tags["custom-reward-id"] === "3d4dac01-86b1-4784-89a7-c416767fb1ea") {
//     console.log("received message", message);
//     res.writeHead(200, {
//       "Content-Type": "text/event-stream",
//       "Access-Control-Allow-Origin": "*",
//     });

//     res.write(JSON.stringify({ voice: "Brian", text: message }));
//     res.end();
//   }
// });

app.listen(8000, () => {
  console.log("server live");
});
