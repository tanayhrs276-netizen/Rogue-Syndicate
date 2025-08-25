import React from "react";
import "./task.css"; // import the css file

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="cover">
        <img src="https://via.placeholder.com/400x200" alt="Cover" />
      </div>
      <div className="profile-info">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="avatar"
        />
        <div className="details">
          <h2>John Doe</h2>
          <p>Web Developer</p>
        </div>
      </div>
      <div className="bio">
        <p>
          Passionate about building modern web apps with React and Node.js.
        </p>
        <button className="connect-btn">Connect</button>
      </div>
    </div>
  );
};

export default ProfileCard;
