import React from "react";
import "./CompanyWise.css";
import buildingImg from "../assets/aleternate.png"; // Adjust path if needed

const CompanyWise = () => {
  // CSV file links
  const csvLinks = {
    google: "https://github.com/Tanishaa2911/Company-Specific/blob/main/google_2year.csv",
    microsoft: "https://github.com/Tanishaa2911/Company-Specific/blob/main/microsoft_alltime.csv",
    atlassian: "https://github.com/Tanishaa2911/Company-Specific/blob/main/atlassian_2year.csv",
    amazon: "https://github.com/Tanishaa2911/Company-Specific/blob/main/amazon_1year.csv"
  };

  // Function to handle company label click
  const handleCompanyClick = (companyName) => {
    window.open(csvLinks[companyName.toLowerCase()], '_blank');
  };

  return (
    <div className="cw-container">
      <h2 className="cw-heading">Company Specific</h2>
      <div className="cw-image-container">
        <img src={buildingImg} alt="Building" className="cw-building-img" />
        <div 
          className="cw-company-label cw-google" 
          onClick={() => handleCompanyClick('google')}
        >
          Google
        </div>
        <div 
          className="cw-company-label cw-microsoft" 
          onClick={() => handleCompanyClick('microsoft')}
        >
          Microsoft
        </div>
        <div 
          className="cw-company-label cw-atlassian" 
          onClick={() => handleCompanyClick('atlassian')}
        >
          Atlassian
        </div>
        <div 
          className="cw-company-label cw-amazon" 
          onClick={() => handleCompanyClick('amazon')}
        >
          Amazon
        </div>
      </div>
    </div>
  );
};

export default CompanyWise;