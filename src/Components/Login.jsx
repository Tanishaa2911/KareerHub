import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div style={styles.loginMain}>
      <div style={styles.loginLeft}>
        <img src={Image} alt="Background" style={styles.image} />
      </div>
      <div style={styles.loginRight}>
        <div style={styles.loginContainer}>
          <div style={styles.loginLogo}>
            <img src={Logo} alt="Logo" style={styles.logo} />
          </div>
          <div style={styles.loginCenter}>
            <h2 style={styles.heading}>Welcome back!</h2>
            <p style={styles.text}>
              Please log in to continue. We're excited to have you back! 
              Explore opportunities and manage your career journey effortlessly.
            </p>
            
            {/* Centered Login Button */}
            <div style={styles.buttonWrapper}>
              <button onClick={() => loginWithRedirect()} style={styles.googleButton}>
                <img src={GoogleSvg} alt="Google Logo" style={styles.googleIcon} />
                Log In with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Updated inline styles
const styles = {
  loginMain: {
    display: "flex",
    height: "100vh",
    width: "100%",
    overflow: "hidden", // Prevents any potential overflow
    backgroundColor: "#f4f4f4",
  },
  loginLeft: {
    flex: 1,
    height: "100%", // Ensures the container takes full height
    position: "relative", // For absolute positioning of child image
    overflow: "hidden", // Prevents image overflow
  },
  image: {
    position: "absolute", // Takes it out of document flow
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
  loginRight: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px", // Added padding to ensure container doesn't touch edges
  },
  loginContainer: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "20px",
    textAlign: "center",
    width: "80%",
    maxWidth: "400px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginLogo: {
    marginBottom: "20px",
  },
  logo: {
    maxWidth: "150px",
  },
  loginCenter: {
    textAlign: "center",
    width: "100%",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.5",
    textAlign: "justify",
    color: "#555",
    padding: "0 10px",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "20px",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#111111",
    color: "#ffffff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "50px", // Rounded edges
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
    width: "100%", // Ensures the button is centered properly
    maxWidth: "280px",
  },
  googleIcon: {
    width: "20px",
    height: "20px",
    marginRight: "10px",
  },
};

export default Login;