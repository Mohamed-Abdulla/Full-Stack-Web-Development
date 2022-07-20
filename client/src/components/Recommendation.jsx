import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;
const Recommendation = ({ tags }) => {
  const { data, loading, error } = useFetch(`/videos/tags?tags=${tags}`);
  return (
    <Container>
      {data.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
