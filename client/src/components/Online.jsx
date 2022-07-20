import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Friends = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
const ProfileImgContainer = styled.div`
  margin-right: 10px;
  position: relative;
`;
const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const Username = styled.span`
  font-weight: 500;
`;
const Onlin = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: limegreen;
  position: absolute;
  top: -2px;
  right: 0;
  border: 2px solid white;
`;
const Online = ({ onlineUsers, currentId, setCurrentChat }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [friends, setFriends] = useState([]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  return (
    <>
      {onlineFriends.map((o) => (
        <Friends>
          <ProfileImgContainer>
            <ProfileImg
              src={
                o?.profilePicture
                  ? o.profilePicture
                  : PF + "person/noAvatar.png"
              }
            />
            <Onlin></Onlin>
          </ProfileImgContainer>
          <Username>{o?.username}</Username>
        </Friends>
      ))}
    </>
  );
};

export default Online;
