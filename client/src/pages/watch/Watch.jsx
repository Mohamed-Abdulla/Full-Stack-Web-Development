import "./watch.scss";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useState } from "react";

function Watch() {
  const [trailerUrl, setTrailerUrl] = useState(""); //to store and  keep track of the trailer url

  const opts = {
    height: "100%",
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
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlinedIcon />
          Home
        </div>
        {trailerUrl && (
          <YouTube className="video" videoId={trailerUrl} opts={opts} />
        )}
      </Link>
    </div>
  );
}

export default Watch;
