import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
  //props destructuring
  const base_url = "https://image.tmdb.org/t/p/original/"; //for append image to ur
  const [movies, setMovies] = useState([]); //to store and  keep track of the movies
  const [trailerUrl, setTrailerUrl] = useState(""); //to store and  keep track of the trailer url

  useEffect(() => {
    //when row component is rendered, run this function and feed info from tmdb
    //make a request to the api //pull the movie info when the row component is rendered
    async function fetchData() {
      //!when we pull the data from the api, we need to wait for the response,so we use async function
      const request = await axios.get(fetchUrl); //after req wait for comeback
      setMovies(request.data.results); //set the movies to the request.data.results
      return request;
    }
    fetchData();
    //if anything pulled from outside used in useeffect,we have to make it as a dependencies
  }, [fetchUrl]); //empty array means that this effect will only run once when the component is rendered

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    //click image to play trailer

    if (trailerUrl) {
      setTrailerUrl(""); //if trailer playing, stop it by setting it to empty
    } else {
      movieTrailer(movie?.name || movie?.title || "") //"" for default value as protection
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search); //to get the last part of the video url
          setTrailerUrl(urlParams.get("v")); //set the trailer url to the last part of the video url
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row-poster ${isLargeRow && "row-posterLarge"}`} //make two edit in same component by using diff className
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
