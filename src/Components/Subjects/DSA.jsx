import React from 'react';
import Navbar from '../Navbar';
import './DSA.css';
import driveIcon from '../../assets/drive-icon.png';
import webIcon from '../../assets/web-icon.png';
import githubIcon from '../../assets/github-icon.png';
import youtubeIcon from '../../assets/youtube-icon.png';

const DSA = ({ theme, setTheme }) => {
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
            <tr><td>Code with Harry</td><td>Notes</td><td><img src={driveIcon} alt="PDF" className="icon" /></td><td><a href="https://cwh-full-next-space.fra1.cdn.digitaloceanspaces.com/notes/DSA_CompleteNotes.pdf" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>5 Minute Engineering</td><td>Notes</td><td><img src={driveIcon} alt="Google Drive" className="icon" /></td><td><a href="https://drive.google.com/file/d/1QfYg-TkfYlTzC_8vmRshWHGJd4MFMmEA/view" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>Rohit Negi</td><td>Notes</td><td><img src={driveIcon} alt="Google Drive" className="icon" /></td><td><a href="https://drive.google.com/file/d/1CSSl9cOz6ArmpChNbg_STo0PGtUNvgHn/view?usp=drive_link" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>Cse Gyan</td><td>Notes</td><td><img src={driveIcon} alt="PDF" className="icon" /></td><td><a href="https://csegyan.com/assets/Cse-Gyan-Notes-PDF/Data-Structure/data_structure-CseGyan-Notes.pdf" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            
            {/* Practice Sheets */}
            <tr><td>Striver</td><td>Practice Sheet</td><td><img src={webIcon} alt="Website" className="icon" /></td><td><a href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>Apna College</td><td>Practice Sheet</td><td><img src={webIcon} alt="Website" className="icon" /></td><td><a href="https://docs.google.com/spreadsheets/d/1hXserPuxVoWMG9Hs7y8wVdRCJTcj3xMBAEYUOXQ5Xag/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>Love Babbar</td><td>Practice Sheet</td><td><img src={webIcon} alt="Website" className="icon" /></td><td><a href="https://www.geeksforgeeks.org/dsa-sheet-by-love-babbar/" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>NeetCode 150</td><td>Practice Sheet</td><td><img src={webIcon} alt="Website" className="icon" /></td><td><a href="https://neetcode.io/practice" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>Company Wise Questions</td><td>Practice Sheet</td><td><img src={githubIcon} alt="GitHub" className="icon" /></td><td><a href="https://github.com/sachuverma/DataStructures-Algorithms/tree/master/Companywise%20Questions" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            
            {/* Important Playlists */}
            <tr><td>Code with Harry DSA</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Apna College C++</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>College Wallah JAVA</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLxgZQoSe9cg00xyG5gzb5BMkOClkch7Gr" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Striver DSA</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Love Babbar C++</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DSA;
