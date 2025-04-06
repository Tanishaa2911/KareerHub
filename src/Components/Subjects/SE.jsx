import React from 'react';
import Navbar from '../Navbar';
import './DSA.css';
import webIcon from '../../assets/web-icon.png';
import youtubeIcon from '../../assets/youtube-icon.png';

const SE = ({ theme, setTheme }) => {
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
            <tr><td>CS Gyan</td><td>Notes</td><td><img src={webIcon} alt="PDF" className="icon" /></td><td><a href="https://csegyan.com/assets/Cse-Gyan-Notes-PDF/Software_Engineering/Software_engineering_CseGyan-Notes.pdf" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>GFG</td><td>Notes</td><td><img src={webIcon} alt="Website" className="icon" /></td><td><a href="https://www.geeksforgeeks.org/software-engineering/" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>VSSUT</td><td>Notes</td><td><img src={webIcon} alt="PDF" className="icon" /></td><td><a href="https://www.vssut.ac.in/lecture_notes/lecture1428551142.pdf" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>Tutorial's Point</td><td>Notes</td><td><img src={webIcon} alt="Website" className="icon" /></td><td><a href="https://www.tpointtech.com/software-engineering" target="_blank" rel="noopener noreferrer">View</a></td></tr>

            {/* Important Playlists */}
            <tr><td>Gate Smashers</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Knowledge Gate</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLmXKhU9FNesTrw7n8ouPsSLEcduRlENHr" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>CS Gyan</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLqcuf9-ILPYA-OGMephZ0U9c8JvdefE0X" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SE;
