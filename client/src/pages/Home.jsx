import React, { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import useFetch from "../hooks/useFetch";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ toggle, type }) => {
  const { data, loading, error } = useFetch(`/videos/${type}`);
  return (
    <Container>
      {data.map((video) => (
        <Card key={video._id} video={video} toggle={toggle} />
      ))}
    </Container>
  );
};

export default Home;
