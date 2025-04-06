// UserInput.jsx
import React, { useState } from 'react';

const UserInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage('');
  };
  
  return (
    <form className="kh-user-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
        className="kh-message-input"
      />
      <button type="submit" className="kh-send-button">➤</button>
    </form>
  );
};

export default UserInput;
