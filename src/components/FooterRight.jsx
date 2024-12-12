// FooterRight.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleCheck, faHeart, faCommentDots, faBookmark, faShare, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import SharePopup from './SharePopup';
import './FooterRight.css';

function FooterRight({ likes, comments, saves, shares, profilePic, videoRef, videoUrl }) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const handleUserAddClick = () => {
        setUserAddIcon(faCircleCheck);
        setTimeout(() => {
            setUserAddIcon(null);
        }, 3000);
    };

    const parseLikesCount = (count) => {
        if (typeof count === 'string') {
            if (count.endsWith('K')) {
                return parseFloat(count) * 1000;
            }
            return parseInt(count);
        }
        return count;
    };

    const formatLikesCount = (count) => {
        if (count >= 10000) {
            return (count / 1000).toFixed(1) + 'K';
        }
        return count;
    };

    const handleLikeClick = () => {
        setLiked((prevLiked) => !prevLiked);
    };

    const handleShareClick = () => {
        setShowSharePopup(true);
    };

    const handleClosePopup = () => {
        setShowSharePopup(false);
    };

    const handleMuteClick = () => {
        setIsMuted((prevMuted) => !prevMuted);
    };

    const handleBookmarkClick = () => {
        setSaved((prevSaved) => !prevSaved);
        if (!saved) {
            navigator.clipboard.writeText(videoUrl).then(() => {
                alert('Video URL copied to clipboard!');
            });
        }
    };

    React.useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted, videoRef]);

    return (
        <div className='footer-right'>
            <div className='sidebar-icon'>
                {profilePic ? (
                    <img src={profilePic} className='userprofile' alt='Profile' style={{ width: '45px', height: '45px', color: '616161' }} />
                ) : null}
                <FontAwesomeIcon icon={userAddIcon} className='useradd' style={{ width: '15px', height: '15px', color: '#FF0000' }} onClick={handleUserAddClick} />
            </div>
            <div className='sidebar-icon'>
                <FontAwesomeIcon icon={faHeart} style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white' }} onClick={handleLikeClick} />
                <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
            </div>
            <div className='sidebar-icon'>
                <FontAwesomeIcon icon={faCommentDots} style={{ width: '35px', height: '35px', color: 'white' }} />
                <p>{comments}</p>
            </div>
            <div className='sidebar-icon'>
                <FontAwesomeIcon icon={faBookmark} style={{ width: '35px', height: '35px', color: saved ? 'ffc107' : 'white' }} onClick={handleBookmarkClick} />
                <p>{saved ? saves + 1 : saves}</p>
            </div>
            <div className='sidebar-icon'>
                <FontAwesomeIcon icon={faShare} style={{ width: '35px', height: '35px', color: 'white' }} onClick={handleShareClick} />
                <p>{shares}</p>
            </div>
            <div className='sidebar-icon'>
                <button onClick={handleMuteClick} style={{ background: 'none', border: 'none', color: 'white' }}>
                    <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} style={{ width: '35px', height: '35px' }} />
                </button>
                <p>{isMuted ? 'Muted' : 'Unmuted'}</p>
            </div>
            <div className='sidebar-icon record'>
                <img src="https://static.thenounproject.com/png/934821-200.png" alt='Record icon' />
            </div>
            {showSharePopup && <SharePopup onClose={handleClosePopup} />}
        </div>
    );
}

export default FooterRight;
