// lib imports
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputFiles from "react-input-files";
import ss from "socket.io-stream";
import DownloadProgressBar from "../DownloadProgressBar/DownloadProgressBar";

const UploadFileCard = props => {
  const { lobbyNumber, socket } = props;
  const lobbyNumberText = "Lobby: #" + lobbyNumber;
  const [currentFile, setCurrentFile] = useState({});
  const [uploadedFileSize, setUploaddedFileSize] = useState(0);
  const [canUploadFile, setCanUploadFile] = useState(true);

  const onFileChange = useCallback(files => setCurrentFile(files[0]), []);
  const sendFile = useCallback(() => {
    // disable buttons
    setCanUploadFile(false);

    const stream = ss.createStream();
    ss(socket).emit("file-upload", stream, {
      size: currentFile.size,
      name: currentFile.name
    });
    // use blob
    const blobStream = ss.createBlobReadStream(currentFile);

    blobStream.on("data", chunk => {
      setUploaddedFileSize(size => {
        const totalSize = size + chunk.length;
        // send progress to every user in the room
        const percentage = Math.floor((totalSize / currentFile.size) * 100);
        socket.emit("file-upload-progress", percentage);
        return totalSize;
      });
    });

    ss.createBlobReadStream(currentFile).pipe(stream);
  }, [currentFile, socket]);

  //
  const uploadPercentage = Math.floor(
    (uploadedFileSize / currentFile.size) * 100
  );

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>{lobbyNumberText}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted font-italic">
          Click to add your file (one file per upload)
        </Card.Subtitle>
        <hr />
        <div>
          {currentFile && currentFile.name ? (
            <InputGroup className="mb-3">
              <FormControl
                placeholder={currentFile.name}
                aria-label={currentFile.name}
                aria-describedby="file"
                disabled={true}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={sendFile}
                  disabled={!canUploadFile}
                >
                  Send
                </Button>
              </InputGroup.Append>
            </InputGroup>
          ) : null}
          {/* ıf the file is getting uploaded */}
          {uploadPercentage > 0 ? (
            <DownloadProgressBar percentage={uploadPercentage} />
          ) : null}
          <Row>
            <Col />

            <Col style={colStyle}>
              {canUploadFile ? (
                <InputFiles onChange={onFileChange}>
                  <span style={plusStyle}>+</span>
                </InputFiles>
              ) : null}
            </Col>
            <Col />
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

const cardStyle = {
  marginTop: "20px",
  minHeight: "25vh"
};

const colStyle = {
  textAlign: "center"
};

const plusStyle = {
  fontSize: "4rem",
  color: "#ff6a6c",
  cursor: "pointer"
};

UploadFileCard.propTypes = {
  lobbyNumber: PropTypes.number.isRequired,
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired
  })
};

export default UploadFileCard;
