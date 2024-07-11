import React from 'react';
import '../styles/IdentityPhoto.css';

const IdentityPhoto = ({ photoUrl }) => {
    const divStyle = {
        backgroundImage: `url(${photoUrl})`,
    };

    return <div className="identity-photo" style={divStyle}></div>;
};

export default IdentityPhoto;