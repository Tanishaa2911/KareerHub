import React from 'react';
import { useNavigate } from 'react-router-dom';



const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate();

  const toggle_mode = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }

  const goToChatbot = () => {
    navigate('/landing2');
  }
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

  return (
    <div className="navbar">
      <ul>
        <li><span onClick={() => navigate('/landing')}>Home</span></li> {/* Navigation without Link */}
        <li><span onClick={() => navigate('/profile')}>Profile</span></li> {/* Placeholder path */}
        <li><span onClick={goToChatbot}>Chatbot</span></li> {/* Navigate to Chatbot */}
        <li><span onClick={() => navigate('/about')}>About</span></li> {/* Placeholder path */}
      </ul>
      
    </div>
  );
}

export default Navbar;
