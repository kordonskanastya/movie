import React, { useRef, useState } from "react";

import classes from "./AddMovie.module.css";

async function addMovieHandler(movie, showResultFunction, props) {
  try {
    await fetch(
      "https://weighty-arcadia-339712-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    showResultFunction("Successfully add movie");
    props.onMovieAdded();
  } catch (error) {
    showResultFunction("An Error occupied");
  }
}

interface Movieprops {
  onMovieAdded: () => void;
}

function AddMovie(props: Movieprops) {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");
  const [resultOfAddingMovie, setResultAddMovie] = useState("");

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";

    addMovieHandler(movie, setResultAddMovie, props);
  }

  return (
    <form onSubmit={submitHandler}>
      <p>{resultOfAddingMovie}</p>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date" ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
