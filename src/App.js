import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';

const videoUrls = [
  {
    url: require('./videos/video1.mp4'),
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi0keATCLi5l4ZMtID1ezsCOw5m0tlJI9DHdbQPJGXs7CNVWDAoZNhMgjaryHeuH3RVJ4&usqp=CAU',
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