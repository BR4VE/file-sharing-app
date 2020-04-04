const { http } = require("../serverConfig");
const io = require("socket.io")(http);
const ss = require("socket.io-stream");
const path = require("path");
const fs = require("fs");
const util = require("util");

// promisified methods
const unlink = util.promisify(fs.unlink);
const readdir = util.promisify(fs.readdir);
const rmdir = util.promisify(fs.rmdir);

// store the socket lobbys
const socketLobbies = new Map();

class SocketLobby {
  constructor(lobbyNum = Date.now()) {
    this._lobbyNum = lobbyNum;
    this._lobby = io.of("/lobby-" + this._lobbyNum);
    this._usersInLobby = [];

    // push to the socketlobbys
    // do not pollute the scope
    {
      const { _lobby } = this;
      socketLobbies.set(lobbyNum, _lobby);
    }

    this._lobby.on("connection", socket => {
      // add user to list
      this._addUserToLobby(socket);
      // emit lobby information
      this._sendLobbyInformation();
      // handle disconnections
      this._handleDisconnections(socket);
      // hanle upload percentage
      this._handleUploadProgress(socket);

      /*
      TODO & NOTE:
      In the future rather than saving the file and download
      I will implement two way streaming which will enable
      us to download at the same time with upload
      
      */

      // get file and save
      ss(socket).on("file-upload", (stream, data) => {
        const fileName = path.basename(data.name);
        this.fileName = fileName;

        let writeStreamPath =
          __dirname + "/../temporary/lobby-" + lobbyNum + "/";

        // create the path
        fs.mkdirSync(writeStreamPath, { recursive: true });

        writeStreamPath += fileName;

        // save files under a specific room file
        const socketStream = fs.createWriteStream(writeStreamPath);

        stream.on("end", () => {
          // let the client side know that the file is ready to download
          this._lobby.emit("file-download-end", { fileName });
          // remove files after 30 minutes
          this._removeFile(fileName);
        });

        stream.pipe(socketStream);
      });
    });
  }

  getLobbyNum() {
    return this._lobbyNum;
  }

  // Private methods

  _handleUploadProgress(socket) {
    const prgs = "file-upload-progress";
    socket.on(prgs, data => this._lobby.emit(prgs, data));
  }

  _handleDisconnections(socket) {
    socket.on("disconnect", () => {
      const socketId = socket.id.split("#")[1];
      this._usersInLobby = this._usersInLobby.filter(
        userId => userId !== socketId
      );

      // remove listeners
      socket.removeAllListeners("file-upload-progress");
      ss(socket).removeAllListeners("file-upload");

      this._sendLobbyInformation();
    });
  }

  _sendLobbyInformation() {
    const { fileName = "", _usersInLobby } = this;
    this._lobby.emit("lobby-file-info", { fileName });
    this._lobby.emit("lobby-user-info", { usersInLobby: _usersInLobby });
  }

  _addUserToLobby(socket) {
    this._usersInLobby.push(socket.id.split("#")[1]);
  }

  _removeFile(fileName) {
    setTimeout(() => {
      const filePath =
        __dirname + "/../temporary/lobby-" + this._lobbyNum + "/";

      unlink(filePath + fileName)
        .then(() => readdir(filePath))
        .then(files => {
          if (!files.length) return fs.rmdir(filePath);
        });
    }, 1000 * 60 * 30);
  }

  // TODO need to remove rooms when everyone has left
}

// just to run it
module.exports = SocketLobby;
