import { useContext, useRef } from "react";
import styled from "styled-components";
import { login } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

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
  height: 300px;
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
  :disabled {
    cursor: not-allowed;
  }
`;
const Forgot = styled.span`
  text-align: center;
  color: var(--main);
`;
const RegisterButton = styled.button`
  height: 50px;
  border-radius: 10px;
  width: 100%;
  align-self: center;
  border: none;
  background-color: #669933;
  color: white;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  padding: 10px 20px;
  :hover {
    zoom: 104%;
  }
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
            <Input placeholder="Email" type="email" required ref={email} />
            <Input
              placeholder="password"
              type="password"
              required
              minLength="6"
              ref={password}
            />
            {error && <Error>Email or Password is incorrect !</Error>}
            <LoginButton type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress style={{ color: "white" }} size={20} />
              ) : (
                "Log In"
              )}
            </LoginButton>
            <Forgot>Forgot Password?</Forgot>
            <Div>
              <Link to="/register">
                <RegisterButton>
                  {isFetching ? (
                    <CircularProgress style={{ color: "white" }} size={20} />
                  ) : (
                    "Create a New Account"
                  )}
                </RegisterButton>
              </Link>
            </Div>
          </Box>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Login;
