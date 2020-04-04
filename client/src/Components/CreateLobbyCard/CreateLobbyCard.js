// lib imports
import React, { useCallback } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreateLobbyCard = props => {
  const { setLobbyNum } = props;

  const createLobby = useCallback(() => {
    axios
      .get("http://localhost:8000/create-lobby")
      .then(res => res.data)
      .then(data => {
        if (data.lobbyNum) {
          setLobbyNum(data.lobbyNum);
        }
      });
    // then set hasCreated
  }, [setLobbyNum]);

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>Create Lobby</Card.Title>
        <Card.Subtitle className="mb-2 text-muted font-italic">
          You can share your files with other users in the lobby
        </Card.Subtitle>
        <hr />
        <div>
          <Row>
            <Col />
            <Col style={colStyle}>
              <span style={plusStyle} onClick={createLobby}>
                +
              </span>
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

export default CreateLobbyCard;
