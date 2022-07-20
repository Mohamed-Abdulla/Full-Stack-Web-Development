import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logOut } from "../redux/userSlice";
import { mobile } from "../utils/responsive";
import axios from "axios";

const Container = styled.div`
  position: relative;
  height: 60px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  position: relative;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "12px" })}
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
  :focus {
    outline: none;
  }
`;
const DataResult = styled.div`
  position: absolute;
  padding: 10px;
  top: 30px;
  left: 40px;
  height: fit-content;
  width: 168px;
  background-color: white;
  overflow: hidden;
  overflow-y: auto;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  ::-webkit-scrollbar {
    display: none;
  }

  z-index: 1;
`;

const Item = styled.p`
  padding: 4px;
  cursor: pointer;
  text-transform: lowercase;
  :hover {
    background-color: #e9f5f5;
  }
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bolder;
  color: #000035;
  ${mobile({ fontSize: "18px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: 1.5, marginRight: "12px" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    const res = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/search?title=${query}`
        );
        setData(response.data);
      } catch (error) {
        console.log("error");
      }
    };
    res();
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" onChange={handleSearch} />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
          {query && (
            <DataResult id="result">
              {data.map((i) => (
                <Link to={"/product/" + i._id}>
                  <Item key={i._id}>{i.title.split(" ", 3)}</Item>
                </Link>
              ))}
            </DataResult>
          )}
        </Left>
        <Link to="/">
          <Center>
            <Logo>WEB MALL</Logo>
          </Center>
        </Link>
        {user ? (
          <Right>
            <MenuItem>Welcome, {user.username.split(" ")[0]}!</MenuItem>
            <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        ) : (
          <Right>
            <Link to="/register">
              <MenuItem>REGISTER</MenuItem>
            </Link>
            <Link to="/login">
              <MenuItem>SIGN IN</MenuItem>
            </Link>
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
