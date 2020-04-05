// lib imports
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const UserListCard = props => {
  const [users, setUsers] = useState([]);
  const { socket } = props;

  useEffect(() => {
    // add listener for users if there is a socket
    if (!socket) return;

    socket.on("lobby-user-info", data => {
      setUsers(data.usersInLobby);
    });

    return () => {
      socket.removeAllListeners("lobby-user-info");
    };
  }, [socket]);

  let userJsx = users.map(userId => (
    <ListGroup.Item key={userId}>
      {userId === socket.id.split("#")[1] ? "You" : "User#" + userId}
    </ListGroup.Item>
  ));

  userJsx = userJsx.length ? (
    userJsx
  ) : (
    <span className="font-italic text-muted">
      Currently, there are no users in your lobby
    </span>
  );

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>Users in the Lobby:</Card.Title>
        <hr />
        <div>
          <ListGroup>{userJsx}</ListGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

const cardStyle = {
  marginTop: "20px",
  minHeight: "25vh"
};

UserListCard.propTypes = {
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired
  })
};

export default UserListCard;
