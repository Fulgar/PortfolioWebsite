import React from 'react';
import PropTypes from 'prop-types';
import './Homepage.css';
import portrait from "../../images/JacketTie1.jpg"

const Homepage = () => (
    <div className="Homepage">
        <div className={"main-content"}>
            <img className={"portrait-img"} src={portrait} alt={"Jason James"}/>
        </div>
    </div>
);

Homepage.propTypes = {};

Homepage.defaultProps = {};

export default Homepage;
