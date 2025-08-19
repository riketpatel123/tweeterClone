import React, { useState } from "react";
import "./ProfileForm.css";

const avatars = [
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
];

function ProfileForm({ onProfileCreate }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [handle, setHandle] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !handle.trim()) {
      setError("First name and handle are required.");
      return;
    }
    if (!handle.startsWith("@")) {
      setError("Handle must start with @.");
      return;
    }
    onProfileCreate({
      firstName,
      lastName,
      handle,
      avatar: selectedAvatar,
    });
  };

  return (
    <main className="container profile-form-container">
      <section className="profile-form">
        <h2>Create Your Profile</h2>
        <p>Join the conversation!</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="handle">Handle</label>
            <input
              type="text"
              id="handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="@yourhandle"
              required
            />
          </div>
          <div className="form-group">
            <label>Select Your Avatar</label>
            <div className="avatar-selection">
              {avatars.map((avatar) => (
                <img
                  key={avatar}
                  src={avatar}
                  alt="avatar choice"
                  className={selectedAvatar === avatar ? "selected" : ""}
                  onClick={() => setSelectedAvatar(avatar)}
                />
              ))}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Join Tweeter
          </button>
        </form>
      </section>
    </main>
  );
}

export default ProfileForm;
