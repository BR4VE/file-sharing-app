// lib imports
import React from "react";
import PropTypes from "prop-types";

const DownloadProgressBar = props => {
  let { percentage = 0 } = props;
  let widthPercentage = percentage < 25 ? 25 : percentage;

  return (
    <div style={progressBarOuterStyle}>
      <div
        style={{
          ...progressBarInnerStyle,
          width: widthPercentage + "%"
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

const progressBarOuterStyle = {
  backgroundColor: "#f1f1f1",
  borderRadius: "7px"
};

const progressBarInnerStyle = {
  padding: "0.01em 16px",
  textAlign: "center",
  backgroundColor: "#FF6A6C",
  borderRadius: "7px"
};

DownloadProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default DownloadProgressBar;
