import React from "react";
import "./Loader.css"; // Make sure you have this CSS file

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="newtons-cradle">
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
      </div>
    </div>
  );
};

export default Loader;
