import React from "react";
import "./About.css"; // Ensure you have this CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faLightbulb, faUsers } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <section className="about-kareerhub">
      <h2>
        <span className="highlight">About</span> KareerHub
      </h2>
      <div className="about-container">
        <div className="about-box">
          <FontAwesomeIcon icon={faBriefcase} size="6x" />
          <p>
            KareerHub is a one-stop platform designed to assist students and job
            seekers in career development, skill-building, and placement
            preparation.
          </p>
        </div>
        <div className="about-box">
          <FontAwesomeIcon icon={faLightbulb} size="6x" />
          <p>
            We provide structured learning paths, curated resources, and
            interactive tools to enhance knowledge, making learning engaging and
            effective.
          </p>
        </div>
        <div className="about-box">
          <FontAwesomeIcon icon={faUsers} size="6x" />
          <p>
            With a strong community of learners and mentors, KareerHub connects
            aspiring professionals with industry leaders for guidance and career
            success.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
