import React from "react";

function TweetForm() {
  const click = (event) => {
    console.log(event);
    event.preventDefault();
  };
  const thought = "What are you humming about?";
  return (
    <section className="newtweet">
      <form method="post" action="/tweets" className="newtweet__form" onClick={click}>
        <textarea
          className="form__textarea"
          name="text"
          placeholder={thought}
        ></textarea>
        <input type="submit" value="Tweet" className="form__input" onClick={click} />
        <span className="form__counter">140</span>
      </form>
    </section>
  );
}
export default TweetForm;