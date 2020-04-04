// lib imports
import React, { useEffect } from "react";

// Component imports
import FileSharingApp from "./Components/FileSharingApp/FileSharingApp";
// CSS imports
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  useEffect(() => {}, []);
  return (
    <div className="App">
      <FileSharingApp />
    </div>
  );
}

export default App;
