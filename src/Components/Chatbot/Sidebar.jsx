// Sidebar.jsx
import React from 'react';

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="kh-sidebar">
      <div className="kh-sidebar-header">
        <h1>KareerHub</h1>
      </div>
      <div className="kh-sidebar-footer">
        <button className="kh-theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <div className="kh-user-profile">
          <div className="kh-user-avatar">U</div>
          <span className="kh-user-name">User</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;