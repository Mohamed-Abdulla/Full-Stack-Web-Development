import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div``;
const Top = styled.div`
  padding: 5px 10px;
  height: 25%;
  width: 100%;
  display: flex;
  gap: 30px;
  align-items: center;
`;
const ProfilePic = styled.img`
  height: 85px;
  width: 85px;
  border-radius: 50%;
  object-fit: cover;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Profilename = styled.span`
  font-size: 25px;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
`;
const Sub = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Hr = styled.hr`
  margin: 25px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Bottom = styled.div``;

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Top>
        <ProfilePic src={currentUser.img} />
        <Details>
          <Profilename>{currentUser.name}</Profilename>
          <Sub>{currentUser.subscribers} subscribers</Sub>
        </Details>
      </Top>
      <Hr />
      <Bottom>
        <h1>Channel Information :</h1>
      </Bottom>
    </Container>
  );
};

export default Profile;
