import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ChatOnlineContainer = styled.div``;
const OnlineFriend = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
`;
const ImgContainer = styled.div`
  position: relative;
  margin-right: 10px;
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid white;
`;
const OnlineBadge = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: limegreen;
  position: absolute;
  top: -2px;
  right: 0;
  border: 2px solid white;
`;
const OnlineFriendName = styled.span``;

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      if (res) {
        setCurrentChat(res.data);
      } else {
        const res = await axios.post(`/conversations/${currentId}/${user._id}`);
        if (res) {
          setCurrentChat(res.data);
        }
      }
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
    <ChatOnlineContainer>
      {onlineFriends.map((o) => (
        <OnlineFriend onClick={() => handleClick(o)}>
          <ImgContainer>
            <Img
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
            />

            <OnlineBadge></OnlineBadge>
          </ImgContainer>
          <OnlineFriendName>{o?.username}</OnlineFriendName>
        </OnlineFriend>
      ))}
    </ChatOnlineContainer>
  );
};

export default ChatOnline;
