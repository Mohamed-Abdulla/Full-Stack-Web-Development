import React, { useState, useEffect } from "react";
import axios from "../../axios";
import requests from "../../requests";
import "./Banner.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
function Banner() {
  const [movie, setMovie] = useState([]); //for random movie in banner
  const [trailerUrl, setTrailerUrl] = useState(""); //to store and  keep track of the trailer url

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1) //everytime new random movie
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  // console.log(movie);
  function truncate(str, n) {
    //this  is for ... atter description
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    //click playbutton to play trailer
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
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-buttons">
          <button className="banner-button" onClick={() => handleClick(movie)}>
            Play
          </button>
          <button className="banner-button">My List</button>
        </div>
        <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner-fadeBottom" />
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </header>
  );
}

export default Banner;
