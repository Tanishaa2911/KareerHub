import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Components/Login';
import Landing from './Components/Landing';
import Landing2 from './Components/Landing2';
import Profile from './Components/Profile';
import Cards from './Components/Cards';
import DSA from './Components/Subjects/DSA';
import DBMS from './Components/Subjects/DBMS';
import OOPS from './Components/Subjects/OOPS';
import CN from './Components/Subjects/CN';
import SE from './Components/Subjects/SE';
import OS from './Components/Subjects/OS';

function App() {
  const { isLoading, error } = useAuth0();
  const [theme, setTheme] = useState('dark'); // Manage theme globally

  return (
    <Router>
      <main className={`app-container ${theme}`}> {/* Apply theme class */}
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/landing" element={<Landing theme={theme} setTheme={setTheme} />} />
            <Route path="/landing2" element={<Landing2 theme={theme} setTheme={setTheme} />} />
            <Route path="/profile" element={<Profile theme={theme} setTheme={setTheme} />} />
            <Route path="/cards" element={<Cards theme={theme} setTheme={setTheme} />} />
            <Route path="/dsa" element={<DSA theme={theme} setTheme={setTheme} />} />
            <Route path="/dbms" element={<DBMS theme={theme} setTheme={setTheme} />} />
            <Route path="/oops" element={<OOPS theme={theme} setTheme={setTheme} />} />
            <Route path="/cn" element={<CN theme={theme} setTheme={setTheme} />} />
            <Route path="/se" element={<SE theme={theme} setTheme={setTheme} />} />
            <Route path="/os" element={<OS theme={theme} setTheme={setTheme} />} />
          </Routes>
        )}
      </main>
    </Router>
  );
}

export default App;
