import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import useFetch from "../hooks/useFetch";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const Search = () => {
  const query = useLocation().search;
  const { data, loading, error } = useFetch(`/videos/search${query}`);
  return (
    <Container>
      {data.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Search;
