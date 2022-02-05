import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './nav.css';
import BurgerLogo from '../../assets/download.png';
import { FaArchive } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
  <div className='nav'>
    <div className='logo-section'>
    <div className='logo-wrapper'>
    <Link to="/">
    <img src={BurgerLogo} alt="Burger logo" />
    </Link>
    
    </div>
    <h4 className="logo_heading">BURGERIAN</h4>
    
    </div>
    <Link to="/orders">
    <FaArchive className='nav-icon'/> 
    </Link>
    
    
  </div>)
};

export default Nav;

