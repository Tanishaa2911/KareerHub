import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputer, faDatabase, faLaptopCode, faChartLine, faCode, faHouseSignal } from '@fortawesome/free-solid-svg-icons';

const subjects = [
    { name: "Data Structure and Algorithms", path: "/dsa", icon: faLaptopCode },
    { name: "Database Management Systems", path: "/dbms", icon: faDatabase },
    { name: "Object Oriented Programming", path: "/oops", icon: faCode },
    { name: "Computer Networks", path: "/cn", icon: faHouseSignal },
    { name: "Software Engineering", path: "/se", icon: faChartLine },
    { name: "Operating Systems", path: "/os", icon: faComputer }
];

const Cards = ({ theme }) => {
    const navigate = useNavigate();

    return (
        <div className={`cards-container ${theme}`}>
            <h2>Learning Courses</h2>
            <p>Master these subjects to excel in placement interviews with our structured resources.</p>
            
            <div className="card-rows">
                {/* Row 1: 3 Cards */}
                <div className="card-row">
                    {subjects.slice(0, 3).map((subject, index) => (
                        <div key={index} className="card" onClick={() => navigate(subject.path)}>
                            <Link to={subject.path} className="card-link">
                                <FontAwesomeIcon icon={subject.icon} className="card-icon" />
                                <div className="proj-txtx">{subject.name}</div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Row 2: 2 Cards */}
                <div className="card-row">
                    {subjects.slice(3, 5).map((subject, index) => (
                        <div key={index} className="card" onClick={() => navigate(subject.path)}>
                            <Link to={subject.path} className="card-link">
                                <FontAwesomeIcon icon={subject.icon} className="card-icon" />
                                <div className="proj-txtx">{subject.name}</div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Row 3: 1 Card */}
                <div className="card-row">
                    {subjects.slice(5, 6).map((subject, index) => (
                        <div key={index} className="card" onClick={() => navigate(subject.path)}>
                            <Link to={subject.path} className="card-link">
                                <FontAwesomeIcon icon={subject.icon} className="card-icon"  />
                                <div className="proj-txtx">{subject.name}</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Cards;
