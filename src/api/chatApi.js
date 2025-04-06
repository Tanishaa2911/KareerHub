import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api";

export const sendMessageToChatbot = async (message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, { messages: [{ content: message }] });
    return response.data.reply;
  } catch (error) {
    console.error("Error communicating with chatbot:", error);
    return "Sorry, something went wrong. Please try again.";
  }
};

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading resume:", error);
    return { success: false, error: "Upload failed. Try again." };
  }
};