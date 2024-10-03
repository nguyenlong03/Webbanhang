import React from "react";
import "./notify.scss";
import { useState } from "react";

const Notification = () => {
  return (
    <div className="notify">
      <div className="notification-container">
        <div className="notification-header">
          <span>New notification</span>
        </div>
        <div className="notification-body">
          <div className="notification-list">
            <div className="notification-item">
              <div className="avatar">
                <span className="avatar-text">M</span>
              </div>
              <div className="notification-content">
                <p className="notification-user">Manish Tamang</p>
                <p className="notification-action">commented on your photo</p>
                <span className="notification-time">a few seconds ago</span>
              </div>
            </div>
            <div className="notification-item">
              <div className="avatar">
                <span className="avatar-text">M</span>
              </div>
              <div className="notification-content">
                <p className="notification-user">Manish Tamang</p>
                <p className="notification-action">commented on your photo</p>
                <span className="notification-time">a few seconds ago</span>
              </div>
            </div>
            <div className="notification-item">
              <div className="avatar">
                <span className="avatar-text">M</span>
              </div>
              <div className="notification-content">
                <p className="notification-user">Manish Tamang</p>
                <p className="notification-action">commented on your photo</p>
                <span className="notification-time">a few seconds ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
