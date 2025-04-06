import React from 'react';
import Navbar from '../Navbar';
import './DSA.css';
import driveIcon from '../../assets/drive-icon.png';
import webIcon from '../../assets/web-icon.png';
import youtubeIcon from '../../assets/youtube-icon.png';

const DBMS = ({ theme, setTheme }) => {
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
            <tr><td>Cse Gyan</td><td>Notes</td><td><img src={driveIcon} alt="PDF" className="icon" /></td><td><a href="https://csegyan.com/assets/Cse-Gyan-Notes-PDF/DBMS/CseGyan-DBMS-Notes.pdf" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>Love Babbar</td><td>Notes</td><td><img src={driveIcon} alt="Google Drive" className="icon" /></td><td><a href="https://drive.google.com/file/d/1y3KKghRhQjKfbWhvLipMOCCemKd_XdTm/view" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            
            {/* Practice Sheets */}
            <tr><td>Leetcode 50</td><td>Practice Sheet</td><td><img src={webIcon} alt="Website" className="icon" /></td><td><a href="https://leetcode.com/studyplan/top-sql-50/" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>Coding Ninjas top 100</td><td>Practice Sheet</td><td><img src={webIcon} alt="Website" className="icon" /></td><td><a href="https://www.naukri.com/code360/problem-lists/top-100-sql-problems" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>GFG Practice</td><td>Practice Sheet</td><td><img src={webIcon} alt="Website" className="icon" /></td><td><a href="https://www.geeksforgeeks.org/sql-exercises/" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>CodeChef SQL</td><td>Practice Sheet</td><td><img src={webIcon} alt="Website" className="icon" /></td><td><a href="https://www.codechef.com/practice/sql-case-studies-topic-wise" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            {/* Important Playlists */}
            <tr><td>Gate Smashers</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Knowledge Gate</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Love Babbar</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLDzeHZWIZsTpukecmA2p5rhHM14bl2dHU" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Jenny's Lectures</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLdo5W4Nhv31b33kF46f9aFjoJPOkdlsRc" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>

            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DBMS;
