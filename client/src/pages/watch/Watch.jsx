import "./watch.scss";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Watch() {
  const location = useLocation();
  const movie = location.movie;
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlinedIcon />
          Home
        </div>
        <video className="video" autoPlay progress controls src={movie.video} />
      </Link>
    </div>
  );
}

export default Watch;
