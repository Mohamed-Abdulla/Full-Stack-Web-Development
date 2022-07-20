import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: ${(props) => (props.own ? "flex-end" : "flex-start")};
`;
const MessageTop = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const MessageText = styled.p`
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.own ? "whitesmoke" : "#3b8585")};
  color: ${(props) => (props.own ? "black" : "white")};
  max-width: 300px;
`;
const MessageBottom = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;

const Message = ({ message, ownMessage, currentUser }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friendDetail, setFriendDetail] = useState([]);

  useEffect(() => {
    const friendDetails = async () => {
      try {
        const res = await axios.get("/users?userId=" + message.sender);
        setFriendDetail(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    friendDetails();
  }, []);
  return (
    <MessageContainer own={ownMessage}>
      <MessageTop>
        {ownMessage ? (
          <Img
            src={
              currentUser?.profilePicture
                ? PF + currentUser?.profilePicture
                : PF + "person/noAvatar.png"
            }
          />
        ) : (
          <Img
            src={
              friendDetail?.profilePicture
                ? PF + friendDetail?.profilePicture
                : PF + "person/noAvatar.png"
            }
          />
        )}

        <MessageText own={ownMessage}>{message.text}</MessageText>
      </MessageTop>
      <MessageBottom>{format(message.createdAt)}</MessageBottom>
    </MessageContainer>
  );
};

export default Message;
