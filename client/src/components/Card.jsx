import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import useFetch from "../hooks/useFetch";

const Container = styled.div`
  width: ${(props) => (props.mini ? props.type !== "sm" && "280px" : "314px")};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
  cursor: pointer;

  transition: transform 0.2s; /* Animation */
  :hover {
    transform: scale(1.05);
  }
`;
const Image = styled.img`
  width: 100%;
  height: ${(props) =>
    props.mini
      ? props.type === "sm"
        ? "100px"
        : "142px"
      : props.type === "sm"
      ? "100px"
      : "176px"};
  background-color: #999;
  flex: 1.5;
  margin-right: ${(props) => props.type === "sm" && "10px"};
  object-fit: cover;
`;
const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  flex: 1;
  gap: 12px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ toggle, type, video }) => {
  const { data, loading, error } = useFetch(`/users/find/${video.userId}`);
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container mini={toggle} type={type}>
        <Image type={type} mini={toggle} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={data.img} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{data.name}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
