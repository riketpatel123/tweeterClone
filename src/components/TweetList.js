import React from "react";
import Tweet from "./Tweet";

function TweetList({ tweets = [], onDeleteTweet, onUpdateTweet, currentUser }) {
  return (
    <section className="tweets">
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweet={tweet}
          onDeleteTweet={onDeleteTweet}
          onUpdateTweet={onUpdateTweet}
          currentUser={currentUser}
        />
      ))}
    </section>
  );
}

export default TweetList;
