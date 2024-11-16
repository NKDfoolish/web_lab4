import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';
import './TopNavbar.css';

const TopNavbar = ({ onSearch }) => {
    const [searchInput, setSearchInput] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(searchInput);
        }
    };

    const handleSearchIconClick = () => {
        setIsSearchActive(true);
    };

    return (
        <div className="top-navbar">
            <div className="logo">
                <FontAwesomeIcon icon={faTv} className='icon' />
                <h2>Following | <span>For You</span></h2>
            </div>
            <div className={`search-container ${isSearchActive ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faSearch} className='icon' onClick={handleSearchIconClick} />
                {isSearchActive && (
                    <input
                        type="text"
                        placeholder="Search by hashtag"
                        value={searchInput}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                )}
            </div>
        </div>
    );
};

export default TopNavbar;