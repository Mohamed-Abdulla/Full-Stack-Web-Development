import styled from "styled-components";
// import { Users } from "../dummydata";
import { format } from "timeago.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useRoutes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import IconButton from "@mui/material/IconButton";

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: 30px 0;
  background-color: ${({ theme }) => theme.bgLighter};
`;
const Wrapper = styled.div`
  padding: 10px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TopLeft = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;
const Username = styled.span`
  font-size: 15px;
  font-weight: 500;
  margin: 0 10px;
`;
const Date = styled.span`
  font-size: 12px;
`;
const TopRight = styled.div``;
const Center = styled.div`
  margin: 20px 0px;
`;
const PostText = styled.span``;
const PostImg = styled.img`
  margin-top: 20px;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BottomLeft = styled.div`
  display: flex;
  align-items: center;
`;
const LikeIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
  :hover {
    zoom: 110%;
  }
`;
const LikeCounter = styled.span`
  font-size: 15px;
`;
const BottomRight = styled.div`
  padding: 5px;
  :hover {
    /* background-color: whitesmoke; */
    background-color: ${({ theme }) => theme.bg};

    border-radius: 10px;
  }
`;
const CommentText = styled.span`
  cursor: pointer;
  border-bottom: 1px dashed gray;
`;

const EditText = styled.span`
  background-color: #f54d4d;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  padding: 10px;
`;

const Post = ({ post, username }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isliked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }

    setLike(isliked ? like - 1 : like + 1);
    setIsLiked(!isliked);
  };

  //~delete post
  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?"))
      try {
        await axios.delete("/posts/" + post._id);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <Container>
      <Wrapper>
        <Top>
          <TopLeft>
            {}
            <Link to={`/profile/${user.username}`}>
              <ProfileImage
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
              />
            </Link>
            <Username>{user.username}</Username>
            <Date>{format(post.createdAt)}</Date>
          </TopLeft>
          <TopRight>
            <IconButton>
              <MoreVertIcon onClick={() => setShowEdit(!showEdit)} />
            </IconButton>
            {username === currentUser.username && showEdit && (
              <EditText onClick={deletePost}>Delete</EditText>
            )}
          </TopRight>
        </Top>
        <Center>
          <PostText>{post?.desc}</PostText>
          <PostImg src={PF + post.img} alt="" />
        </Center>
        <Bottom>
          <BottomLeft>
            <LikeIcon src={`${PF}like.png`} onClick={likeHandler} />
            <LikeIcon src={`${PF}heart.png`} onClick={likeHandler} />
            <LikeCounter>{like} people like it</LikeCounter>
          </BottomLeft>
          <BottomRight>
            <CommentText>{post.comment} comments</CommentText>
          </BottomRight>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Post;
