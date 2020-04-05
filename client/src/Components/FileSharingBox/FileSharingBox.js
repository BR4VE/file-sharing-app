// lib imports
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
// component imports
import CreateLobbyCard from "../CreateLobbyCard/CreateLobbyCard";
import UploadFileCard from "../UploadFileCard/UploadFileCard";
import JoinToLobbyCard from "../JoinToLobbyCard/JoinToLobbyCard";
import UserListCard from "../UserListCard/UserListCard";
import DownloadFileCard from "../DownloadFileCard/DownloadFileCard";

const FileSharingBox = () => {
  const [lobbyNum, setLobbyNum] = useState(null);
  const [joinedToLobby, setJoinedToLobby] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!lobbyNum) return;
    // set io
    const sckt = io("/lobby-" + lobbyNum, {
      transports: ["websocket"]
    });

    console.log(sckt);

    setSocket(sckt);

    return () => {
      sckt.disconnect();
    };
  }, [lobbyNum]);

  // Rules:
  /*
    1. If there is no lobby show "Create lobby buton"
    2. If lobby is created show file uploading screen and list of people
        who have joined the lobby

    3. Below all of that put an input to type lobby code
    */

  // Determine the component of upper card
  let upperCard;
  switch (true) {
    // this is prioritized because of the common functions
    case joinedToLobby:
      upperCard = (
        <DownloadFileCard
          lobbyNumber={lobbyNum}
          joinedToLobby={joinedToLobby}
          socket={socket}
        />
      );
      break;
    case !!lobbyNum:
      upperCard = <UploadFileCard lobbyNumber={lobbyNum} socket={socket} />;
      break;

    default:
      upperCard = <CreateLobbyCard setLobbyNum={setLobbyNum} />;
      break;
  }

  return (
    <div style={FileSharingBoxStyle}>
      {upperCard}
      {/* Change these lines according to creation of the lobby */}
      {lobbyNum ? (
        <UserListCard socket={socket} />
      ) : (
        <JoinToLobbyCard
          setLobbyNum={setLobbyNum}
          setJoinedToLobby={setJoinedToLobby}
        />
      )}
    </div>
  );
};

const FileSharingBoxStyle = {
  marginTop: "8vh"
};

export default FileSharingBox;
