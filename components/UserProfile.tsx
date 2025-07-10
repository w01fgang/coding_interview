// @ts-nocheck
import React, { useState, useEffect } from "react";

interface UserProfileProps {
  user: any;
  onProfileClick: any;
  openMenu: () => void;
}

const UserProfile = (props: UserProfileProps) => {
  let [userData, setUserData] = useState(props.user);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    if (userData && userData.name) {
      userData.name = userData.name.toUpperCase();
    }
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", updateWindowSize);
  });
  const handleClick = () => {
    props.onProfileClick(userData);
  };
  const renderFriends = () => {
    if (!userData.friends) return null;
    return userData.friends.map((friend: string, index: number) => (
      <div key={index}>{friend}</div>
    ));
  };
  if (!userData) {
    userData = { name: "Default", friends: [] };
  }
  const containerStyle = {
    border: "1px solid black",
    padding: windowSize.width < 600 ? "5px" : "10px",
    fontSize: windowSize.width < 600 ? "12px" : "16px",
  };
  return (
    <div style={containerStyle}>
      <h1 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        {userData.name}
        <span onClick={props.openMenu} style={{ marginLeft: "8px" }}>
          ✏️
        </span>
      </h1>
      <p>Welcome to the user profile page.</p>
      {renderFriends()}
    </div>
  );
};

export default UserProfile;
