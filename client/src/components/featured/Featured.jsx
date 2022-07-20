import "./featured.scss";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=LA,Alaska,California"
  );

  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    // dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels");
    // navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait..."
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://images2.alphacoders.com/110/thumb-1920-1106573.jpg"
              alt=""
              className="featuredImg"
              onClick={handleSearch}
            />
            <div className="featuredTitles">
              <h1>LA</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://www.travelanddestinations.com/wp-content/uploads/2018/01/Stunning-luxury-hotels-in-London.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://pix10.agoda.net/hotelImages/202911/-1/b31a66e8a0e992ee43b3ab600b79dcff.jpg?ca=7&ce=1&s=1024x768"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>California</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Featured;
