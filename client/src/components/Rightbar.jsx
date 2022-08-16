import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Users } from "../dummydata";
import Online from "./Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import EditDetails from "../Modals/EditDetails";
import { io } from "socket.io-client";
import { mobile } from "../utils/responsive";

const Container = styled.div`
  flex: 3.5;
  height: calc(100vh - 50px);
  position: sticky;
  top: 50px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  margin-right: 8px;
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
  }
  ${mobile({ display: "none" })}
`;

const Wrapper = styled.div`
  padding: 20px 20px 0 0;
`;
const BirthdayContainer = styled.div`
  display: flex;
  align-items: center;
`;
const BirthdayImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;
const BirthdayText = styled.span`
  font-weight: 300;
  font-size: 15px;
`;
const AdImg = styled.img`
  width: 100%;
  border-radius: 10px;
  margin: 30px 0;
`;
const Title = styled.h4`
  margin-bottom: 20px;
`;
const FriendsList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;
const RightbarTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const RightbarInfo = styled.div`
  margin-bottom: 30px;
`;
const InfoItem = styled.div`
  margin-bottom: 10px;
`;
const Infokey = styled.span`
  font-weight: 500;
  margin-right: 15px;
  color: #555;
`;
const InfokeyValue = styled.span`
  font-weight: 300;
  text-align: center;
`;
const Followings = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
const Following = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  padding: 5px;
  :hover {
    background-color: whitesmoke;
    border-radius: 10px;
  }
`;
const FollowingImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;
const FollowingName = styled.span`
  text-transform: lowercase;
`;
const FollowButton = styled.button`
  margin-top: 30px;
  margin-bottom: 20px;
  border: none;
  background-color: rebeccapurple;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser?.following?.includes(user?._id));
  // const [onlineUsers, setOnlineUsers] = useState([]);
  // const [currentChat, setCurrentChat] = useState(null);
  // const socket = useRef();

  const JoinedYear = user?.createdAt.slice(0, 4);
  const JoinedMonth = user?.createdAt.slice(5, 7);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser.following?.includes(user?._id)) {
      setFollowed(true);
    }
  }, [user]);

  // useEffect(() => {
  //   socket.current.emit("addUser", user._id);
  //   socket.current.on("getUsers", (users) => {
  //     setOnlineUsers(
  //       user.following.filter((f) => users.some((u) => u.userId === f))
  //     );
  //   });
  // }, [user]);

  const HomeRightbar = () => {
    return (
      <>
        <BirthdayContainer>
          <BirthdayImg src={`${PF}gift.png`} />
          <BirthdayText>
            <b> Pola Foster </b>and <b>3 other friends</b> have birthday today.
          </BirthdayText>
        </BirthdayContainer>
        <AdImg src="assets/ad.png" />
        <Title>Online Friends</Title>
        <FriendsList>
          {/* <Online
            onlineUsers={onlineUsers}
            currentId={user._id}
            setCurrentChat={setCurrentChat}
          /> */}
        </FriendsList>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <FollowButton onClick={handleFollow}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </FollowButton>
        )}
        <RightbarTitle>
          Intro
          {user.username === currentUser.username && (
            <IconButton>
              <EditIcon onClick={handleShow} />
            </IconButton>
          )}
          <EditDetails show={show} handleClose={handleClose} />
        </RightbarTitle>
        <InfoItem style={{ marginBottom: "35px" }}>
          <InfokeyValue>{user.bio}</InfokeyValue>
        </InfoItem>

        <RightbarTitle>User Information :</RightbarTitle>

        <RightbarInfo>
          <InfoItem>
            <Infokey>Profile Name:</Infokey>
            <InfokeyValue>{user.username}</InfokeyValue>
          </InfoItem>
          <InfoItem>
            <Infokey>Description:</Infokey>
            <InfokeyValue>{user.desc}</InfokeyValue>
          </InfoItem>
          <InfoItem>
            <Infokey>City:</Infokey>
            <InfokeyValue>{user.city}</InfokeyValue>
          </InfoItem>
          <InfoItem>
            <Infokey>From:</Infokey>
            <InfokeyValue>{user.from}</InfokeyValue>
          </InfoItem>
          <InfoItem>
            <Infokey>Relationship:</Infokey>
            <InfokeyValue>
              {user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}
            </InfokeyValue>
          </InfoItem>
          <InfoItem>
            <Infokey>Joined on :</Infokey>
            <InfokeyValue style={{ marginRight: "10px" }}>{monthNames[JoinedMonth - 1]}</InfokeyValue>
            <InfokeyValue>{JoinedYear}</InfokeyValue>
          </InfoItem>
        </RightbarInfo>
        <RightbarTitle>User Friends({friends.length})</RightbarTitle>
        <Followings>
          {friends.map((friend) => (
            <Link to={"/profile/" + friend.username}>
              <Following>
                <FollowingImg
                  src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"}
                  alt=""
                />
                <FollowingName>{friend.username}</FollowingName>
              </Following>
            </Link>
          ))}
        </Followings>
      </>
    );
  };

  return (
    <Container>
      <Wrapper>{user ? <ProfileRightbar /> : <HomeRightbar />}</Wrapper>
    </Container>
  );
};

export default Rightbar;
