// lib imports
import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

// component imports
import DownloadProgressBar from "../DownloadProgressBar/DownloadProgressBar";

const DownloadFileCard = props => {
  const [currentFileInformation, setCurrentFileInformation] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const { lobbyNumber, socket, joinedToLobby } = props;
  const lobbyNumberText = "Lobby: #" + lobbyNumber;

  useEffect(() => {
    // if the user is not the sender (receiver)
    // set an on download event
    if (!joinedToLobby || !socket) return;

    socket.on("file-download-end", data => {
      setCurrentFileInformation(data);
    });

    socket.on("lobby-file-info", data => {
      if (data.fileName) setCurrentFileInformation(data);
    });

    socket.on("file-upload-progress", data => setUploadPercentage(data));

    return () => {
      socket.removeAllListeners("file-event-end");
      socket.removeAllListeners("lobby-file-info");
      socket.removeAllListeners("file-upload-progess");
    };

    // set an event to fetch current content
  }, [joinedToLobby, socket]);

  const downloadFile = useCallback(() => {
    window.open(
      "/lobby/" + lobbyNumber + "/download/" + currentFileInformation.fileName
    );
  }, [currentFileInformation, lobbyNumber]);

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>{lobbyNumberText}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted font-italic">
          Please wait until the file is fully uploaded
        </Card.Subtitle>
        <hr />
        <div>
          {currentFileInformation ? (
            <InputGroup className="mb-3">
              <FormControl
                placeholder={currentFileInformation.fileName}
                aria-label={currentFileInformation.fileName}
                aria-describedby="file"
                disabled={true}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={downloadFile}>
                  Download
                </Button>
              </InputGroup.Append>
            </InputGroup>
          ) : (
            <DownloadProgressBar percentage={uploadPercentage} />
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

const cardStyle = {
  marginTop: "20px",
  minHeight: "25vh"
};

DownloadFileCard.propTypes = {
  lobbyNumber: PropTypes.number.isRequired,
  joinedToLobby: PropTypes.bool.isRequired,
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired
  })
};

export default DownloadFileCard;
