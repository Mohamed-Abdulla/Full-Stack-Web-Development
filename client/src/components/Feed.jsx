import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import Share from "./Share";
// import { Posts } from "../dummydata";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { mobile } from "../utils/responsive";

const Container = styled.div`
  flex: 5.5;
  ${mobile({ width: "100%" })}
`;
const Wrapper = styled.div`
  padding: 20px;
`;

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);
  return (
    <Container>
      <Wrapper>
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} username={username} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Feed;
