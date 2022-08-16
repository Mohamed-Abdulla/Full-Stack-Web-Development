import styled from "styled-components";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import Friends from "./Friends";
// import { Users } from "../dummydata";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { mobile } from "../utils/responsive";

const Container = styled.div`
  flex: 3;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
    border-radius: 20px;
  }
  position: sticky;
  top: 50px;

  ${mobile({ display: "none" })}
`;

const Wrapper = styled.div`
  padding: 15px;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 5px;
  :hover {
    /* background-color: whitesmoke; */
    background-color: ${({ theme }) => theme.bgLighter};
    border-radius: 10px;
  }
`;
const ListItemText = styled.span`
  margin-left: 15px;
`;
const Button = styled.button`
  width: 150px;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;
const Hr = styled.hr`
  margin: 20px 0px;
`;
const FriendList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;
const Title = styled.h4`
  margin-bottom: 20px;
`;

const Sidebar = () => {
  const [followers, setFollowers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const friendList = await axios.get("/users/followers/" + user._id);
        setFollowers(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowers();
  }, [user]);
  return (
    <Container>
      <Wrapper>
        <List>
          <Link to="/">
            <ListItem>
              <RssFeedIcon htmlColor="gray" />
              <ListItemText>Feed</ListItemText>
            </ListItem>
          </Link>
          <Link to="/messenger">
            <ListItem>
              <ChatIcon htmlColor="gray" />
              <ListItemText>Chats</ListItemText>
            </ListItem>
          </Link>
          <ListItem>
            <PlayCircleFilledOutlinedIcon htmlColor="gray" />
            <ListItemText>Videos</ListItemText>
          </ListItem>
          <ListItem>
            <GroupIcon htmlColor="gray" />
            <ListItemText>Groups</ListItemText>
          </ListItem>
          <ListItem>
            <BookmarkIcon htmlColor="gray" />
            <ListItemText>Bookmarks</ListItemText>
          </ListItem>
          <ListItem>
            <HelpOutlineIcon htmlColor="gray" />
            <ListItemText>Questions</ListItemText>
          </ListItem>
          <ListItem>
            <WorkOutlineIcon htmlColor="gray" />
            <ListItemText>Jobs</ListItemText>
          </ListItem>
          <ListItem>
            <EventIcon htmlColor="gray" />
            <ListItemText>Events</ListItemText>
          </ListItem>
          <ListItem>
            <SchoolIcon htmlColor="gray" />
            <ListItemText>Courses</ListItemText>
          </ListItem>
        </List>
        <Button>Show More</Button>
        <Hr />
        <FriendList>
          <Title>Followers ({followers.length})</Title>

          {followers.map((f) => (
            <Link to={"/profile/" + f.username}>
              <Friends key={f._id} follower={f} />
            </Link>
          ))}
        </FriendList>
      </Wrapper>
    </Container>
  );
};

export default Sidebar;
