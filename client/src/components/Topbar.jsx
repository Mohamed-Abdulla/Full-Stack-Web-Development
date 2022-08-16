import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "../context/AuthActions";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import Logout from "../Modals/Logout";
import { useEffect } from "react";
import { mobile } from "../utils/responsive";

const TopbarContainer = styled.div`
  z-index: 1;
  height: 50px;
  width: 100%;
  background-color: var(--main);
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  ${mobile({ padding: "0 10px" })}
`;
const TopbarLeft = styled.div`
  flex: 3;
  ${mobile({ flex: 2.2 })}
`;
const Logo = styled.span`
  font-size: 24px;
  margin-left: 20px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  ${mobile({ fontSize: "20px", marginLeft: "0px" })}
`;
const TopbarCenter = styled.div`
  flex: 5;
  ${mobile({ flex: 4 })}
  display: flex;
  flex-direction: column;
`;
const Searchbar = styled.div`
  width: 100%;
  height: 30px;
  background-color: white;

  border-radius: 30px;
  display: flex;
  align-items: center;
  position: sticky;
`;

const Input = styled.input`
  border: none;
  width: 70%;

  &:focus {
    outline: none;
  }
`;
const DataResult = styled.div`
  position: fixed;
  padding: 10px;
  top: 44px;
  height: fit-content;
  width: 40%;
  /* background-color: white; */
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  overflow: hidden;
  overflow-y: auto;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  ::-webkit-scrollbar {
    display: none;
  }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 12px;

  :hover {
    background-color: whitesmoke;
    border-radius: 10px;
  }
`;
const UserName = styled.span`
  text-transform: lowercase;
`;
const UserImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;
const TopbarRight = styled.div`
  flex: 4;
  ${mobile({ flex: 4.5 })}
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
`;
const Links = styled.div``;
const ILink = styled.span`
  margin-right: 20px;
  ${mobile({ marginRight: "10px" })}
  font-size: 14px;
  cursor: pointer;
  :hover {
    color: whitesmoke;
  }
`;
const Icons = styled.div`
  display: flex;
`;
const IconItem = styled.div`
  margin-right: 15px;
  cursor: pointer;
  position: relative;
  ${mobile({
    display: (props) => props.hide === "true" && "none",
  })}
`;
const IconBadge = styled.span`
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;
const ProfilePic = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const Topbar = ({ darkMode, setDarkMode }) => {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    const res = async () => {
      try {
        const res = await axios.get(`/users/search?username=${query}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    res();
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(LogOut());
  };

  useEffect(() => {
    const fetchDp = async () => {
      const res = await axios.get(`/users?userId=${user._id}`);
      setImage(res.data);
    };
    fetchDp();
  }, [user]);

  return (
    <TopbarContainer>
      <TopbarLeft>
        <Link to="/">
          <Logo>Social 🌍</Logo>
        </Link>
      </TopbarLeft>
      <TopbarCenter>
        <Searchbar>
          <SearchIcon style={{ fontSize: 20, marginLeft: 10 }} />

          <Input placeholder="Search for friend, post or video" onChange={handleSearch} />
        </Searchbar>
        {query && (
          <DataResult>
            {data.map((user) => (
              <Link to={"/profile/" + user.username}>
                {data ? (
                  <User>
                    <UserImg src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} />
                    <UserName key={user._id}>{user.username}</UserName>
                  </User>
                ) : (
                  <div>No results..</div>
                )}
              </Link>
            ))}
          </DataResult>
        )}
      </TopbarCenter>
      <TopbarRight>
        <Links>
          <Link to="/">
            <ILink>
              <HomeRoundedIcon />
            </ILink>
          </Link>
          <ILink onClick={() => setDarkMode(!darkMode)}>
            <DarkModeIcon />
          </ILink>
        </Links>
        <Icons>
          <IconItem hide="true">
            <PersonIcon />
            <IconBadge>1</IconBadge>
          </IconItem>
          <Link to="/messenger">
            <IconItem>
              <ChatIcon />
              <IconBadge>2</IconBadge>
            </IconItem>
          </Link>
          <IconItem hide="true">
            <NotificationsIcon />
            <IconBadge>2</IconBadge>
          </IconItem>
          <IconItem onClick={handleShow}>
            <LogoutIcon />
          </IconItem>
          <Logout show={show} handleClose={handleClose} handleLogout={handleLogout} />
        </Icons>
        <Link to={`/profile/${user.username}`}>
          <ProfilePic src={image?.profilePicture ? PF + image.profilePicture : PF + "person/noAvatar.png"} />
        </Link>
      </TopbarRight>
    </TopbarContainer>
  );
};

export default Topbar;
