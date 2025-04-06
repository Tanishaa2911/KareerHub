import React from 'react';
import Navbar from '../Navbar';
import './DSA.css';
import driveIcon from '../../assets/drive-icon.png';
import webIcon from '../../assets/web-icon.png';
import youtubeIcon from '../../assets/youtube-icon.png';

const CN = ({ theme, setTheme }) => {
  return (
    <div className={`dsa-container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />

      <div className="table-container">

        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Type</th>
              <th>Format</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {/* Notes */}
            <tr><td>Apna College</td><td>Notes</td><td><img src={driveIcon} alt="Google Drive" className="icon" /></td><td><a href="https://drive.google.com/drive/folders/1XGI3YnWEviwJ3MryCH2f7dhlN9tnYTzh" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>CS Gyan</td><td>Notes</td><td><img src={webIcon} alt="PDF" className="icon" /></td><td><a href="https://csegyan.com/assets/Cse-Gyan-Notes-PDF/Computer-Networks/CSEGYAN_CN_Computer_Network_notes.pdf" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>IIT Kanpur</td><td>Notes</td><td><img src={webIcon} alt="Website" className="icon" /></td><td><a href="https://www.cse.iitk.ac.in/users/dheeraj/cs425/" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>GFG</td><td>Notes</td><td><img src={webIcon} alt="Website" className="icon" /></td><td><a href="https://www.geeksforgeeks.org/last-minute-notes-computer-network/" target="_blank" rel="noopener noreferrer">View</a></td></tr>

            {/* Important Playlists */}
            <tr><td>Gate Smashers</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Neso Academy</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Gate Wallah</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PL3eEXnCBViH-hlNCNwdfV7VrEcTquANGa" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Knowledge Gate (One Shot)</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/watch?v=APVCgkqWcQ4" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CN;
