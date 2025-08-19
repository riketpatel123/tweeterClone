import React, { useState } from "react";

function TweetForm({ onTweet }) {
  const [tweetText, setTweetText] = useState("");
  const [error, setError] = useState("");
  const remainingChars = 140 - tweetText.length;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (tweetText.trim().length === 0) {
      setError("Tweet cannot be empty.");
      return;
    }

    if (remainingChars < 0) {
      setError("Tweet is too long. Maximum 140 characters allowed.");
      return;
    }

    setError(""); // Clear error on valid submission
    onTweet(tweetText);
    setTweetText(""); // Clear the form
  };

  const thought = "What are you humming about?";
  const counterClass = remainingChars < 0 ? "form__counter--error" : "";
  return (
    <section className="newtweet">
      {error && (
        <div
          className="alert alert-danger"
          style={{ color: "red", paddingBottom: "1em" }}
        >
          <i className="fas fa-exclamation-triangle" /> {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="newtweet__form">
        <textarea
          className="form__textarea"
          name="text"
          placeholder={thought}
          value={tweetText}
          onChange={(e) => {
            setTweetText(e.target.value);
            if (error) {
              setError("");
            }
          }}
        ></textarea>
        <div className="newtweet__buttons">
          <button type="submit" className="form__input">
            Tweet
          </button>
          <span className={`form__counter ${counterClass}`}>
            {remainingChars}
          </span>
        </div>
      </form>
    </section>
  );
}
export default TweetForm;
