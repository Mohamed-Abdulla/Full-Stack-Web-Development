import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import CancelIcon from "@mui/icons-material/Cancel";
import Skeleton from "../components/Skeleton";

const FullScreenContainer = styled.div``;
const FullScreenImage = styled.img`
  object-fit: contain;
  width: 100vw;
  height: 100vh;
`;

const FullScreen = () => {
  const username = useParams().username;
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/users?username=${username}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchUser();
  }, [username]);

  return (
    <FullScreenContainer>
      {loading ? (
        <Skeleton type="circle" />
      ) : (
        <>
          {path === "cover" ? (
            <FullScreenImage
              src={
                user.coverPicture
                  ? PF + user.coverPicture
                  : "https://media-exp1.licdn.com/dms/image/C5616AQH4v01QIau5tA/profile-displaybackgroundimage-shrink_350_1400/0/1563753751845?e=1663200000&v=beta&t=_LmHl_CnE3ROFemFU0GfPNjdZaa4DPqOJ0SdpVHGVeQ"
              }
            />
          ) : (
            <FullScreenImage
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
            />
          )}

          <CancelIcon
            style={{
              position: "absolute",
              top: "0",
              right: "20px",
              cursor: "pointer",
              opacity: "0.7",
            }}
            onClick={() => window.history.back()}
          />
        </>
      )}
    </FullScreenContainer>
  );
};

export default FullScreen;
