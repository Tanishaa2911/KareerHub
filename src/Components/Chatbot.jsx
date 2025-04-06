import React, { useState, useRef, useEffect } from 'react';
// Option 1: If you have marked installed, uncomment the next line
// import { marked } from 'marked';

function Chatbot({ darkMode }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI career assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Simple markdown parser function (Option 2: if marked is not installed)
  const simpleMarkdown = (text) => {
    if (!text) return '';
    
    // Handle bold text
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italics
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Handle headers
    formatted = formatted.replace(/## (.*?)\n/g, '<h2>$1</h2>');
    formatted = formatted.replace(/### (.*?)\n/g, '<h3>$1</h3>');
    
    // Handle bullet points
    formatted = formatted.replace(/- (.*?)(\n|$)/g, '<li>$1</li>');
    
    // Wrap lists in ul tags
    if (formatted.includes('<li>')) {
      formatted = '<ul>' + formatted + '</ul>';
      // Clean up any empty lists
      formatted = formatted.replace('<ul></ul>', '');
    }
    
    // Handle line breaks
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isGenerating || !message.trim()) return;
    
    const userMessage = message.trim();
    setMessage('');
    
    // Add user message to chat
    setMessages(prevMessages => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: userMessage, sender: 'user' }
    ]);
    
    // Add typing indicator
    setMessages(prevMessages => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: "Typing...", sender: 'bot', typing: true }
    ]);
    
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userMessage }]
        })
      });
      
      const data = await response.json();
      
      // Remove typing indicator and add bot response
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => !msg.typing);
        return [
          ...filteredMessages,
          { id: filteredMessages.length + 1, text: data.reply, sender: 'bot' }
        ];
      });
    } catch (error) {
      // Remove typing indicator and add error message
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => !msg.typing);
        return [
          ...filteredMessages,
          { id: filteredMessages.length + 1, text: "⚠️ Failed to generate response. Please try again.", sender: 'bot' }
        ];
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Add typing indicator
    setMessages(prevMessages => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: "Analyzing resume...", sender: 'bot', typing: true }
    ]);
    
    setIsGenerating(true);
    
    try {
      const formData = new FormData();
      formData.append('resume', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      // Remove typing indicator
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => !msg.typing);
        if (data.success) {
          return [
            ...filteredMessages,
            { id: filteredMessages.length + 1, text: `📄 **Resume Analysis (Score: ${data.analysis.score}/100)**`, sender: 'bot' },
            { id: filteredMessages.length + 2, text: data.analysis.feedback, sender: 'bot' }
          ];
        } else {
          return [
            ...filteredMessages,
            { id: filteredMessages.length + 1, text: `❌ Error: ${data.error}`, sender: 'bot' }
          ];
        }
      });
    } catch (error) {
      // Remove typing indicator and add error message
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => !msg.typing);
        return [
          ...filteredMessages,
          { id: filteredMessages.length + 1, text: "⚠️ Failed to upload resume. Please try again.", sender: 'bot' }
        ];
      });
    } finally {
      setIsGenerating(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  // MessageBubble Component
  const MessageBubble = ({ message }) => {
    // Parse markdown for bot messages
    const renderContent = () => {
      if (message.typing) {
        return (
          <span className="kh-typing-indicator">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        );
      } else if (message.sender === 'bot') {
        // Using dangerouslySetInnerHTML to render the formatted text
        // Using our simple markdown parser
        return <div dangerouslySetInnerHTML={{ __html: simpleMarkdown(message.text) }} />;
      } else {
        return <p>{message.text}</p>;
      }
    };
    
    return (
      <div className={`kh-message-bubble ${message.sender === 'user' ? 'kh-user-message' : 'kh-bot-message'}`}>
        <div className="kh-message-content">
          {renderContent()}
        </div>
        <div className="kh-message-timestamp">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="kh-chat-interface">
      <div className="kh-welcome-message">Hello, User</div>

      <div className="kh-messages-container">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="kh-user-input-container">
        <form onSubmit={handleSubmit} className="kh-user-input-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything about careers..."
            className="kh-message-input"
            disabled={isGenerating}
          />
          <button 
            type="submit" 
            className="kh-send-button"
            disabled={isGenerating}
          >
            ➤
          </button>
        </form>
        <input
          type="file"
          id="file-input"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf,.doc,.docx"
          style={{ display: 'none' }}
        />
        <button 
          className="kh-upload-button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isGenerating}
        >
          📄
        </button>
      </div>
    </div>
  );
}

export default Chatbot;