import React from 'react';
import Navbar from '../Navbar';
import './DSA.css';
import driveIcon from '../../assets/drive-icon.png';
import webIcon from '../../assets/web-icon.png';
import youtubeIcon from '../../assets/youtube-icon.png';

const OOPS = ({ theme, setTheme }) => {
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
            <tr><td>Code with Harry Java</td><td>Notes</td><td><img src={webIcon} alt="PDF" className="icon" /></td><td><a href="https://cwh-full-next-space.fra1.cdn.digitaloceanspaces.com/notes/Java_Complete_Notes.pdf" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>Code with Harry Python</td><td>Notes</td><td><img src={webIcon} alt="PDF" className="icon" /></td><td><a href="https://cwh-full-next-space.fra1.cdn.digitaloceanspaces.com/notes/Python_Complete_Notes.pdf" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>Code with Harry C++</td><td>Notes</td><td><img src={webIcon} alt="Website" className="icon" /></td><td><a href="https://www.codewithharry.com/tutorial/cplusplus/" target="_blank" rel="noopener noreferrer">View</a></td></tr>
            <tr><td>Apna College</td><td>Notes</td><td><img src={driveIcon} alt="Google Drive" className="icon" /></td><td><a href="https://drive.google.com/drive/folders/1XGI3YnWEviwJ3MryCH2f7dhlN9tnYTzh" target="_blank" rel="noopener noreferrer">View</a></td></tr>

            {/* Important Playlists */}
            <tr><td>Code with Harry</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Coder Army</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/playlist?list=PLQEaRBV9gAFujcBWJhBT2XXsuMlIfETBy" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Love Babbar</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/watch?v=i_5pvt7ag7E" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
            <tr><td>Apna College C++</td><td>Playlist</td><td><img src={youtubeIcon} alt="YouTube" className="icon" /></td><td><a href="https://www.youtube.com/watch?v=mlIUKyZIUUU" target="_blank" rel="noopener noreferrer">Watch</a></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OOPS;
