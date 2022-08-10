import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import Skeleton from "./Skeleton";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function Products({ cat, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          cat ? `http://localhost:5000/api/products/?category/${cat}` : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (error) {}
      setLoading(false);
    };

    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value)))
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt));
    } else if (sort === "asc") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      {Loading ? (
        <Skeleton type="custom" />
      ) : (
        <>
          {cat
            ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
            : products.map((item) => <Product item={item} key={item.id} />)}
        </>
      )}
    </Container>
  );
}

export default Products;
