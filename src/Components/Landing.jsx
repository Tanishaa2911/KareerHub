import React, { useState } from 'react';
import Navbar from './Navbar';
import Cards from './Cards';
import  Banner  from './Banner';  // Keep the named import as Banner is a named export
import './Landing.css'
import CompanyWise from './CompanyWise';
import About from './About';
const Landing = () => {
  const [theme, setTheme] = useState('dark');

  return (
    <div className={`container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <Banner theme={theme} />  {/* Pass theme as a prop */}
      <Cards theme={theme} />
      <CompanyWise theme={theme} />
      <About theme={theme} />

    </div>
  );
}

export default Landing;
