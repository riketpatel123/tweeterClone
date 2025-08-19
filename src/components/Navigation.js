import React from "react";

function Navigation({ onToggleTweetForm, onLogout }) {
  const handleClick = (event) => {
    event.preventDefault();
    onToggleTweetForm();
  };

  return (
    <nav>
      <span
        className="nav--text"
        onClick={onLogout}
        style={{ cursor: "pointer" }}
        title="Logout"
      >
        tweeter
      </span>

      <div className="btn btn--scroll">
        <a
          href="#"
          onClick={handleClick}
          className="btn__text btn--borderless"
          title="Compose Tweet"
        >
          <span className="btn--bold">Write</span> a new tweet
          <br />
          <i className="btn__icon fas fa-angle-double-down"></i>
        </a>
      </div>
    </nav>
  );
}
export default Navigation;
