import React from 'react';
import '../styles/IdentityPhoto.css';

const IdentityPhoto = ({ photoUrl }) => {
    if (!photoUrl) {
        return null;  // Handle case where photo data is null
    }

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    const base64 = `data:image/jpeg;base64,${arrayBufferToBase64(photoUrl)}`;

    const divStyle = {
        backgroundImage: `url(${base64})`,
    };

    return <div className="identity-photo" style={divStyle}></div>;
};

export default IdentityPhoto;