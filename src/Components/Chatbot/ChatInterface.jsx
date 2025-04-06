// ChatInterface.jsx
import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import UserInput from './UserInput';

const ChatInterface = ({ messages, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="kh-chat-interface">
      <div className="kh-welcome-message">Hello, User</div>

      <div className="kh-messages-container">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <UserInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatInterface;