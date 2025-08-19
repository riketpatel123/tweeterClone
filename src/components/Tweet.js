import React, { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

function Tweet({ tweet, onUpdateTweet, onDeleteTweet, currentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(tweet.body);
  const [showConfirm, setShowConfirm] = useState(false);

  // A simple check to determine if the current user "owns" the tweet.
  // In a real app, this would be based on a logged-in user's ID.
  const isOwner = currentUser && tweet.handle === currentUser.handle;

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editedBody.trim() && editedBody.length <= 140) {
      onUpdateTweet(tweet.id, editedBody);
      setIsEditing(false);
    }
    // Optionally, add error handling for invalid updates
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDeleteTweet(tweet.id);
    setShowConfirm(false);
  };

  return (
    <article className="tweet">
      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this tweet?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <header className="tweet--header">
        <img
          className="tweet--avatar"
          src={tweet.avatar}
          alt={`Avatar of ${[tweet.firstName, tweet.lastName]
            .filter(Boolean)
            .join(" ")}`}
        />
        <h2 className="tweet--name">
          {[tweet.firstName, tweet.lastName].filter(Boolean).join(" ")}
        </h2>
        <small className="tweet--handle">{tweet.handle}</small>
      </header>

      <div className="tweet--body">
        {isEditing ? (
          <form onSubmit={handleUpdate} className="tweet--edit-form">
            <textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              className="form__textarea"
              autoFocus
            />
            <div className="newtweet__buttons">
              <button type="submit" className="form__input">
                Save
              </button>
              <button
                type="button"
                className="form__input"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p>{tweet.body}</p>
        )}
      </div>

      <footer className="tweet--footer">
        <small className="footer--age">
          {tweet.age}
          <small>
            <span className="footer--actions">
              {!isEditing && (
                <>
                  {isOwner && (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        title="Edit tweet"
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          margin: "0 0.25rem",
                          cursor: "pointer",
                          color: "#007bff",
                        }}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        title="Delete tweet"
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          margin: "0 0.25rem",
                          cursor: "pointer",
                          color: "#007bff",
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </>
                  )}
                </>
              )}
            </span>
          </small>
        </small>
      </footer>
    </article>
  );
}
export default Tweet;
