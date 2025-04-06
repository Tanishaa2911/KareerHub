import React from 'react';

const MessageBubble = ({ message }) => {
  return (
    <div className={`kh-message-bubble ${message.sender === 'user' ? 'kh-user-message' : 'kh-bot-message'}`}>
      <div className="kh-message-content">
        {message.typing ? (
          <span className="kh-typing-indicator">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        ) : (
          <p>{message.text}</p>
        )}
      </div>
      <div className="kh-message-timestamp">
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default MessageBubble;
