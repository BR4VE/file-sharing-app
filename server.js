const { app, http } = require("./serverConfig");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const SocketLobby = require("./socket/socket");

// middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/client/build"));

// serve react app (after build)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

app.get("/create-lobby", (req, res) => {
  const newLobby = new SocketLobby();
  res.json({ lobbyNum: newLobby.getLobbyNum() });
});

app.get("/lobby/:lobbyNum/download/:fileName", (req, res) => {
  const { lobbyNum, fileName } = req.params;
  const filePath = __dirname + "/temporary/lobby-" + lobbyNum + "/" + fileName;
  res.download(filePath);
});

http.listen(process.env.PORT || 8000, () => {
  console.log("connected to server");
});
