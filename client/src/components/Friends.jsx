import React from "react";
import styled from "styled-components";

const Friend = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 5px;
  :hover {
    /* background-color: whitesmoke; */
    background-color: ${({ theme }) => theme.bgLighter};
    border-radius: 5px;
  }
`;
const FriendImage = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;
const FriendName = styled.span`
  text-transform: lowercase;
`;

const Friends = ({ follower }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Friend>
      <FriendImage
        src={
          follower.profilePicture
            ? PF + follower.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <FriendName>{follower.username}</FriendName>
    </Friend>
  );
};

export default Friends;
