import './index.css';
import imgLogo from '../img/logo.png';
import React from 'react';

function logo() {
    return (
        <img src={imgLogo} class='logo' draggable='false' alt="Logo" />
    );
}
export default logo;
