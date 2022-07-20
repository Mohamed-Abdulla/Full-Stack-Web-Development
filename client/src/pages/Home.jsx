import styled from "styled-components";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

function home({ darkMode, setDarkMode }) {
  return (
    <>
      <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <HomeContainer>
        <Sidebar />
        <Feed />
        <Rightbar />
      </HomeContainer>
    </>
  );
}

export default home;
