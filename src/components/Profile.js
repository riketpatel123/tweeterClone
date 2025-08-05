import React from "react";

function Profile() {
  const firstname = "Amy";
  const lastName = "Mansell";
  const avtar = "./profile-hex.png";
  return (
    <aside>
      <div class="profile">
        <img class="profile__image" src={avtar} alt="avtar" />
      </div>
      <br />
      <div class="profile__name">
        <h2><span class="profile--bold">{firstname}</span> {lastName}</h2>
      </div>
    </aside>
  );
}

export default Profile;