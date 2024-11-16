import React from 'react';
import './SharePopup.css';

const SharePopup = ({ onClose }) => {
    return (
        <div className="share-popup">
            <div className="share-popup-content">
                <button className="close-btn" onClick={onClose}>X</button>
                <h3>Share on:</h3>
                <ul>
                    <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    <li><a href="https://www.threads.net" target="_blank" rel="noopener noreferrer">Thread</a></li>
                </ul>
            </div>
        </div>
    );
};

export default SharePopup;