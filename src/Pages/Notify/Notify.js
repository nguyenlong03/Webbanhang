import React from "react";
import "./notify.scss";

const Notification = ({ notifications }) => {
  console.log("notifications", notifications);
  return (
    <div className="notify">
      <div className="notification-container">
        <div className="notification-header">
          <span>New notification</span>
        </div>
        <div className="notification-body">
          <div className="notification-list">
            {notifications.map((notification, index) => (
              <div className="notification-item" key={index}>
                <div className="avatar">
                  <span className="avatar-text">N</span>
                </div>
                <div className="notification-content">
                  <p className="notification-user">{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
