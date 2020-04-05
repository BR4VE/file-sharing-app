// lib imports
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const JoinToLobbyCard = props => {
  const [inputValue, setInputValue] = useState("");
  const [isPending] = useState(false);

  // set when connected to a lobby
  const { setLobbyNum, setJoinedToLobby } = props;

  const handleInputChange = useCallback(event => {
    setInputValue(event.target.value);
  }, []);

  const joinLobby = useCallback(() => {
    if (!inputValue) return;

    setLobbyNum(inputValue);
    setJoinedToLobby(true);
  }, [inputValue, setJoinedToLobby, setLobbyNum]);

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>Join a Room</Card.Title>
        <Card.Subtitle className="mb-2 text-muted font-italic">
          Enter the lobby number without #
        </Card.Subtitle>
        <hr />
        <div>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="112233"
              aria-label="lobby-number"
              aria-describedby="basic-addon2"
              onChange={handleInputChange}
              disabled={isPending}
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                onClick={joinLobby}
                disabled={isPending}
              >
                Join
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

const cardStyle = {
  marginTop: "20px",
  minHeight: "15vh"
};

JoinToLobbyCard.propTypes = {
  setLobbyNum: PropTypes.func.isRequired,
  setJoinedToLobby: PropTypes.func.isRequired
};

export default JoinToLobbyCard;
