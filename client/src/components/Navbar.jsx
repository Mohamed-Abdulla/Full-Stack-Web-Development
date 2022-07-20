import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import youtube from "../img/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import Upload from "./Upload";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NotificationsNoneSharpIcon from "@mui/icons-material/NotificationsNoneSharp";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import { width } from "@mui/system";
import useFetch from "../hooks/useFetch";
import { mobile } from "../utils/responsive";

const Container = styled.div`
  top: 0;
  position: sticky;
  height: 56px;
  background-color: ${({ theme }) => theme.bgLighter};
  border-bottom: 0.5px solid ${({ theme }) => theme.soft};
`;
const MenuButton = styled.span`
  font-size: 28px;
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: large;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-left: 10px;
`;

const Img = styled.img`
  height: 25px;
  ${mobile({ marginRight: "10px" })}
`;
const LogoTxt = styled.span`
  ${mobile({ display: "none", marginRight: "10px" })}
`;

const Search = styled.div`
  width: 40%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px;
  /* border: 1px solid #ccc; */
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  ::placeholder {
    font-size: 16px;
  }
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Userdiv = styled.div`
  display: flex;
  gap: 22px;
  ${mobile({ display: "none" })}
`;

const Avatar = styled.img`
  width: ${(props) => (props.type === "big" ? "40px" : "32px")};
  height: ${(props) => (props.type === "big" ? "40px" : "32px")};
  border-radius: 50%;
  cursor: pointer;
  background-color: #999;
  position: relative;
`;

const ModalContainer = styled.div`
  position: absolute;
  width: 300px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  top: 57px;
  right: 5px;
`;
const ModalWrapper = styled.div`
  padding: 10px 20px;
  height: 100%;
`;
const ModalItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const ModalUserName = styled.span`
  font-size: 16px;
  font-weight: 500;
`;
const Hr = styled.hr`
  margin: 10px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const DataResult = styled.div`
  position: fixed;
  padding: 10px;
  top: 56px;
  left: 420px;
  height: fit-content;
  width: 39%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  overflow: hidden;
  overflow-y: auto;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Navbar = ({ toggle, setToggle }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out")) dispatch(logout());
    navigate("/");
  };

  const { data, loading, error } = useFetch(`/videos/search?q=${q}`);
  console.log(data);

  return (
    <>
      <Container>
        <Wrapper>
          <IconButton>
            <MenuButton onClick={() => setToggle(!toggle)}>
              <MenuIcon />
            </MenuButton>
          </IconButton>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <Img src={youtube} />
              <LogoTxt>YouTube</LogoTxt>
            </Logo>
          </Link>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          {q && (
            <DataResult>
              {data?.map((video) => (
                <Link
                  to={`/video/${video._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span>{video.title}</span>
                </Link>
              ))}
            </DataResult>
          )}
          {currentUser ? (
            <>
              <User>
                <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
                <Userdiv>
                  <AppsOutlinedIcon />
                  <NotificationsNoneSharpIcon />
                </Userdiv>
                <Avatar src={currentUser.img} onClick={() => setShow(!show)} />
              </User>
              {show && (
                <ModalContainer>
                  <ModalWrapper>
                    <ModalItem>
                      <Avatar type="big" src={currentUser.img} />
                      <ModalUserName>{currentUser.name}</ModalUserName>
                    </ModalItem>
                    <Hr />
                    <Link
                      to="/profile"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ModalItem>
                        <AccountBoxOutlinedIcon />
                        Your Channel
                      </ModalItem>
                    </Link>
                    <ModalItem>
                      <MonetizationOnOutlinedIcon />
                      Purchases and memberships
                    </ModalItem>
                    <ModalItem>
                      <SmartDisplayOutlinedIcon />
                      Youtube Studio
                    </ModalItem>
                    <ModalItem onClick={handleLogout}>
                      <ExitToAppOutlinedIcon />
                      Sign Out
                    </ModalItem>
                    <ModalItem>
                      <TranslateOutlinedIcon />
                      Language : English
                    </ModalItem>
                    <ModalItem>
                      <MyLocationOutlinedIcon />
                      Location : India
                    </ModalItem>
                    <ModalItem>
                      <SettingsOutlinedIcon />
                      Settings
                    </ModalItem>
                    <ModalItem>
                      <HelpOutlineOutlinedIcon />
                      Help
                    </ModalItem>
                    <ModalItem>
                      <FeedbackOutlinedIcon />
                      Send Feedback
                    </ModalItem>
                  </ModalWrapper>
                </ModalContainer>
              )}
            </>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
