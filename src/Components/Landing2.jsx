import React, { useState, useRef, useEffect } from 'react';
import './Landing2.css';
import axios from 'axios';


// Message Bubble Component
// Improved Message Bubble Component
const MessageBubble = ({ message }) => (
  <div className={`kh-message-bubble ${message.sender === 'user' ? 'kh-user-message' : 'kh-bot-message'}`}>
    <div className="kh-message-content">
      {message.typing ? (
        <div className="kh-typing-indicator">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      ) : (
        message.html ? (
          <div dangerouslySetInnerHTML={{ __html: message.text }} />
        ) : (
          <p>{message.text}</p>
        )
      )}
    </div>
    <div className="kh-message-timestamp">
      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  </div>
);
// User Input with File Upload
const UserInput = ({ onSendMessage, onFileUpload, disabled }) => {
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      setUploading(true);
      await onFileUpload(file);
    } finally {
      setUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  return (
    <form className="kh-user-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about jobs, resumes, or interviews..."
        className="kh-message-input"
        disabled={disabled || uploading}
      />
      <input 
        type="file" 
        id="file-upload" 
        accept=".pdf" 
        hidden 
        onChange={handleFileChange}
        disabled={disabled || uploading}
      />
      <label 
        htmlFor="file-upload" 
        className={`kh-upload-button ${(disabled || uploading) ? 'kh-disabled' : ''}`}
        title="Upload your resume (PDF only)"
      >
        {uploading ? '⏳' : '📎'}
      </label>
      <button 
        type="submit" 
        className="kh-send-button" 
        disabled={!message.trim() || disabled || uploading}
      >
        ➤
      </button>
    </form>
  );
};

// Sidebar Component
const Sidebar = ({ darkMode, toggleDarkMode, onMenuItemClick }) => {
  return (
    <div className="kh-sidebar">
      <div className="kh-sidebar-header">
        <h1>KareerHub</h1>
      </div>
      <div className="kh-sidebar-content">
        <div className="kh-sidebar-section">
          <h3>Career Resources</h3>
          <ul className="kh-sidebar-menu">
            <li onClick={() => onMenuItemClick('resumeTemplates')}>Resume Templates</li>
            <li onClick={() => onMenuItemClick('interviewTips')}>Interview Tips</li>
            <li onClick={() => onMenuItemClick('jobSearchGuide')}>Job Search Guide</li>
          </ul>
        </div>
      </div>
      <div className="kh-sidebar-footer">
        <button className="kh-theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? '💡 Light Mode' : '🌙 Dark Mode'}
        </button>
        
      </div>
    </div>
  );
};

// Chat Interface
const ChatInterface = ({ messages, onSendMessage, onFileUpload, isLoading }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="kh-chat-interface">
      <div className="kh-welcome-message">KareerHub AI Assistant</div>
      <div className="kh-messages-container">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <UserInput 
        onSendMessage={onSendMessage} 
        onFileUpload={onFileUpload} 
        disabled={isLoading} 
      />
    </div>
  );
};

// Main App Component
const Landing2 = () => {
  const [messages, setMessages] = useState([
    { 
      id: Date.now(), 
      text: "Hello! I'm your KareerHub AI Assistant. I can help with resume reviews, interview prep, and job search strategies. What would you like assistance with today?", 
      sender: 'bot',
      timestamp: Date.now(),
      html: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Changed to true for default dark mode

  // Add message utility functions
  const addMessage = (text, sender, html = false) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      timestamp: Date.now(),
      html
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return newMessage;
  };

  const addTypingIndicator = () => {
    const typingMessage = {
      id: Date.now(),
      text: "",
      sender: 'bot',
      timestamp: Date.now(),
      typing: true
    };
    setMessages(prevMessages => [...prevMessages, typingMessage]);
    return typingMessage;
  };

  const removeTypingIndicator = () => {
    setMessages(prevMessages => prevMessages.filter(msg => !msg.typing));
  };

  // Centralized request handling function
  const processUserRequest = async (text) => {
    setIsLoading(true);
    
    // Add typing indicator
    addTypingIndicator();

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { 
        messages: [{ content: text }] 
      });
      
      // Remove typing indicator
      removeTypingIndicator();
      
      if (response.data.success) {
        addMessage(response.data.reply, 'bot', true);
      } else {
        throw new Error(response.data.error || 'Request failed');
      }
    } catch (error) {
      console.error('Chat API error:', error);
      
      // Remove typing indicator and add error message
      removeTypingIndicator();
      addMessage("⚠️ Sorry, I couldn't process your request. Please try again.", 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sidebar menu item clicks
  const handleMenuItemClick = (menuItem) => {
    let prompt = '';
    
    switch(menuItem) {
      case 'resumeTemplates':
        prompt = "Show me popular resume templates and formats for different industry roles.";
        break;
      case 'interviewTips':
        prompt = "What are the best interview preparation tips and common questions for job interviews?";
        break;
      case 'jobSearchGuide':
        prompt = "Provide a comprehensive job search guide including networking, online applications, and follow-up strategies.";
        break;
      default:
        return;
    }
    
    // Add user message for the clicked menu item
    addMessage(prompt, 'user');
    
    // Process the request
    processUserRequest(prompt);
  };
  
  // Handle sending chat messages
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    
    // Add user message
    addMessage(text, 'user');
    
    // Process the user message
    processUserRequest(text);
  };

  // Handle file uploads for resume analysis
  const handleFileUpload = async (file) => {
    if (!file) return;
    
    // Add user message about the upload
    addMessage(`Uploading resume: ${file.name}`, 'user');
    
    // Add typing indicator
    addTypingIndicator();
    
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      // Remove typing indicator
      removeTypingIndicator();
      
      if (response.data.success) {
        // Generate resume analysis message with HTML formatting
        const keywordsList = Object.entries(response.data.analysis.keywordsFound || {})
          .map(([category, words]) => `<strong>${category}</strong>: ${words.join(', ')}`)
          .join('<br>');
        
        const analysisHTML = `
          <h2>📄 Resume Analysis</h2>
          <div class="kh-score-container">
            <div class="kh-score-label">ATS Score:</div>
            <div class="kh-score-value">${response.data.analysis.score}/100</div>
          </div>
          
          <h3>Keywords Found:</h3>
          <div class="kh-keywords-list">
            ${keywordsList || 'No matching keywords found'}
          </div>
          
          <h3>Analysis & Recommendations:</h3>
          <div class="kh-analysis-content">
            ${response.data.analysis.feedback}
          </div>
        `;
        
        addMessage(analysisHTML, 'bot', true);
      } else {
        throw new Error(response.data.error || 'Resume analysis failed');
      }
    } catch (error) {
      console.error('File upload error:', error);
      
      // Add error message
      addMessage(`⚠️ Resume upload failed: ${error.message || 'Please try again with a valid PDF file.'}`, 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle dark/light mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Fixed toggle functionality
    document.body.classList.toggle('kh-dark-mode');
  };

  // Initialize dark mode on component mount
  useEffect(() => {
    // Apply dark mode class to body on initial render
    document.body.classList.add('kh-dark-mode');
  }, []);

  return (
    <div className={`kh-app-container ${darkMode ? 'kh-dark-mode' : ''}`}>
      <Sidebar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        onMenuItemClick={handleMenuItemClick} 
      />
      <main className="kh-main-content">
        <ChatInterface 
          messages={messages} 
          onSendMessage={handleSendMessage} 
          onFileUpload={handleFileUpload}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default Landing2;