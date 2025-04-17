"use client";

import React from "react";

const UserInfo = ({ account }) => {
  const shortenAddress = (address) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected";
  };

  return (
    <div className="userinfo-glass">
      <img
        src="/default-avatar.png"
        alt="User Avatar"
        className="user-avatar"
      />
      <div className="user-details">
        <p className="user-address">
          {account ? shortenAddress(account) : "Wallet not connected"}
        </p>
        <span className={`status-indicator ${account ? "online" : "offline"}`}>
          {account ? "🟢 Connected" : "🔴 Disconnected"}
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
