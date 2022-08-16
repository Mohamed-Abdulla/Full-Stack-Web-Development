import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext, useRef } from "react";
import { login } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  height: 70%;
  width: 70%;
  display: flex;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Logo = styled.h3`
  font-size: 50px;
  font-weight: 800;

  color: var(--main);
  margin-bottom: 10px;
`;
const Desc = styled.span`
  font-size: 24px;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Box = styled.form`
  height: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Input = styled.input`
  height: 50px;
  border-radius: 10px;
  border: 1px solid gray;
  font-size: 18px;
  padding-left: 20px;

  &:focus {
    outline: none;
  }
`;
const LoginButton = styled.button`
  height: 50px;
  border-radius: 10px;
  border: none;

  background-color: var(--main);
  color: white;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
`;

const RegisterButton = styled.button`
  height: 50px;
  border-radius: 10px;
  width: 100%;
  padding: 10px 20px;
  align-self: center;
  border: none;
  background-color: #669933;
  color: white;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  /* :hover {
    zoom: 104%;
  } */
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
`;

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>Social World 🌍</Logo>
          <Desc>
            Connect with friends and the world around you on Social World 🌍 .
          </Desc>
        </Left>
        <Right>
          <Box onSubmit={handleSubmit}>
            <Input placeholder="Username" required ref={username} />
            <Input placeholder="Email" type="email" required ref={email} />
            <Input
              placeholder="password"
              type="password"
              required
              ref={password}
              minLength="6"
            />
            <Input
              placeholder="password again"
              type="password"
              ref={confirmPassword}
              required
              minLength="6"
            />
            <LoginButton type="submit">Sign Up</LoginButton>
            <Div>
              <Link to="/login">
                <RegisterButton>Log into Account</RegisterButton>
              </Link>
            </Div>
          </Box>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Register;
