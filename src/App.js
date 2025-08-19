import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import TweetList from "./components/TweetList";
import TweetForm from "./components/TweetForm";
import ProfileForm from "./components/ProfileForm";
import "./App.css";

const initialTweets = [
  {
    id: 1,
    avatar: "https://i.imgur.com/73hZDYK.png",
    firstName: "Isaac",
    lastName: "Newton",
    handle: "@SirIsaac",
    body: "If I have seen further it is by standing on the shoulders of giants",
    age: "10 days ago",
  },
  {
    id: 2,
    avatar: "https://i.imgur.com/lRUnDgU.png",
    firstName: "Descartes",
    lastName: "",
    handle: "@rd",
    body: "Je pense, donc je suis",
    age: "11 days ago",
  },
];

function App() {
  const [tweets, setTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isTweetFormVisible, setIsTweetFormVisible] = useState(false);

  // Load tweets from localStorage on initial render
  useEffect(() => {
    let tweetsData = JSON.parse(localStorage.getItem("tweets"));
    if (!tweetsData || tweetsData.length === 0) {
      tweetsData = initialTweets;
      localStorage.setItem("tweets", JSON.stringify(tweetsData));
    }
    setTweets(tweetsData);

    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleTweetForm = () => {
    setIsTweetFormVisible((prev) => !prev);
  };

  const addNewTweet = (tweetText) => {
    const newTweet = {
      id: Date.now(), // Simple unique ID
      avatar: currentUser.avatar,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      handle: currentUser.handle,
      body: tweetText,
      age: "Just now",
    };

    const updatedTweets = [newTweet, ...tweets];
    setTweets(updatedTweets);
    localStorage.setItem("tweets", JSON.stringify(updatedTweets));
    setIsTweetFormVisible(false); // Hide form after tweeting
  };

  const deleteTweet = (tweetId) => {
    const updatedTweets = tweets.filter((tweet) => tweet.id !== tweetId);
    setTweets(updatedTweets);
    localStorage.setItem("tweets", JSON.stringify(updatedTweets));
  };

  const updateTweet = (tweetId, newBody) => {
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === tweetId) {
        return { ...tweet, body: newBody, age: "Just now" };
      }
      return tweet;
    });
    setTweets(updatedTweets);
    localStorage.setItem("tweets", JSON.stringify(updatedTweets));
  };

  const handleProfileCreate = (profileData) => {
    setCurrentUser(profileData);
    localStorage.setItem("currentUser", JSON.stringify(profileData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  if (!currentUser) {
    return <ProfileForm onProfileCreate={handleProfileCreate} />;
  }

  return (
    <div className="App">
      <Navigation onToggleTweetForm={toggleTweetForm} onLogout={handleLogout} />
      <Profile user={currentUser} />
      <main className="container">
        {isTweetFormVisible && <TweetForm onTweet={addNewTweet} />}
        <TweetList
          tweets={tweets}
          onDeleteTweet={deleteTweet}
          onUpdateTweet={updateTweet}
          currentUser={currentUser}
        />
      </main>
    </div>
  );
}

export default App;
