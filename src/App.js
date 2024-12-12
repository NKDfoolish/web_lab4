import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';

const videoUrls = [
  {
    url: require('./videos/video1.mp4'),
    profilePic: 'data:image/jpeg;base64,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',
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOXW-TRlM9aSWSnjUHFpqREcV9K3ALiGlvGYKVY88J6ewCaRMnho6LzTqG3920y_a59pY&usqp=CAU',
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require('./videos/video3.mp4'),
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZnduMZFk1GxlUMx5VZL6HnEVctIgePWPyTF3uVivuq2LphVpOQu-STcIed7UfMehj9Y4&usqp=CAU',
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require('./videos/video4.mp4'),
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZnduMZFk1GxlUMx5VZL6HnEVctIgePWPyTF3uVivuq2LphVpOQu-STcIed7UfMehj9Y4&usqp=CAU',
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    setVideos(videoUrls);
    setFilteredVideos(videoUrls);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos]);

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  const handleSearch = (hashtag) => {
    const filtered = videos.filter(video => video.description.includes(`#${hashtag}`));
    setFilteredVideos(filtered);
  };

  return (
      <div className="app">
        <div className="container">
          <TopNavbar onSearch={handleSearch} />
          {filteredVideos.map((video, index) => (
              <VideoCard
                  key={index}
                  username={video.username}
                  description={video.description}
                  song={video.song}
                  likes={video.likes}
                  saves={video.saves}
                  comments={video.comments}
                  shares={video.shares}
                  url={video.url}
                  profilePic={video.profilePic}
                  setVideoRef={handleVideoRef(index)}
                  autoplay={index === 0}
              />
          ))}
          <BottomNavbar />
        </div>
      </div>
  );
}

export default App;