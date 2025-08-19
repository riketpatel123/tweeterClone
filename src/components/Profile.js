import React from "react";

function Profile({ user }) {
  return (
    <aside>
      <div className="profile">
        <img className="profile__image" src={user.avatar} alt="avatar" />
      </div>
      <br />
      <div className="profile__name">
        <h2>
          <span className="profile--bold">{user.firstName}</span>{" "}
          {user.lastName}
        </h2>
      </div>
    </aside>
  );
}

export default Profile;
