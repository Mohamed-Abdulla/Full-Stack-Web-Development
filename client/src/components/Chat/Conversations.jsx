import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Conversation = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  :hover {
    background-color: whitesmoke;
  }
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;
const Name = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <Conversation>
      <Img src={user?.profilePicture ? PF + user?.profilePicture : PF + "person/noAvatar.png"} />
      <Name>{user?.username}</Name>
    </Conversation>
  );
};

export default Conversations;
