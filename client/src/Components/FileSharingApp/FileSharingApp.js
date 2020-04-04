// lib imports
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Container imports
import Navbar from "../Navbar/Navbar";
import Body from "../Body/Body";
import FileSharingBox from "../FileSharingBox/FileSharingBox";

const FileSharingApp = () => {
  return (
    <div>
      <Navbar />
      <Body>
        <Row>
          <Col />
          <Col sm={8} md={8} lg={6}>
            <FileSharingBox />
          </Col>
          <Col />
        </Row>
      </Body>
    </div>
  );
};

export default FileSharingApp;
