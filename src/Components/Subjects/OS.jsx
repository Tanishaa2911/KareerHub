import React from 'react';
import Navbar from '../Navbar';
import './DSA.css';
import driveIcon from '../../assets/drive-icon.png';
import webIcon from '../../assets/web-icon.png';
import youtubeIcon from '../../assets/youtube-icon.png';

const OS = ({ theme, setTheme }) => {
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
            <tr><td>Love Babbar</td><td>Notes</td><td><img src={driveIcon} alt="Google Drive" className="icon" /></td><td><a href="https://drive.google.com/file/d/1kksqpGT_YBQsFwsyVyftikPRP-sZZF-e/view" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>Apna College</td><td>Notes</td><td><img src={driveIcon} alt="Google Drive" className="icon" /></td><td><a href="https://drive.google.com/drive/folders/1XGI3YnWEviwJ3MryCH2f7dhlN9tnYTzh" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>GFG</td><td>Notes</td><td><img src={webIcon} alt="Website" className="icon" /></td><td><a href="https://www.geeksforgeeks.org/last-minute-notes-operating-systems/" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>IIT Bombay</td><td>Notes</td><td><img src={driveIcon} alt="PDF" className="icon" /></td><td><a href="https://www.cse.iitb.ac.in/~puru/courses/spring20/osnotes.pdf" target="_blank" rel="noopener noreferrer">View</a></td></tr>

            {/* Important Playlists */}
            <tr><td>Gate Smashers</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Knowledge Gate</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Neso Academy</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Love Babbar</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLDzeHZWIZsTr3nwuTegHLa2qlI81QweYG" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OS;
