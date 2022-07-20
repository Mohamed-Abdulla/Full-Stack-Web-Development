import styled from "styled-components";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useEffect } from "react";

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  background-color: ${({ theme }) => theme.bgLighter};
`;
const Wrapper = styled.div`
  padding: 10px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
`;
const ShareProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;
const ShareInput = styled.input`
  border: none;
  width: 80%;
  background-color: ${({ theme }) => theme.bgLighter};

  &:focus {
    outline: none;
  }
`;
const Hr = styled.hr`
  margin: 20px;
`;
const Bottom = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ShareOptions = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-left: 20px;
`;
const ShareOption = styled.label`
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
  padding: 10px;
  :hover {
    /* background-color: whitesmoke; */
    background-color: ${({ theme }) => theme.bg};
    border-radius: 10px;
  }
`;
const ShareOptionText = styled.span`
  margin-left: 3px;
  font-size: 14px;
  font-weight: 500;
`;
const Button = styled.button`
  border: none;
  padding: 7px;
  border-radius: 5px;
  background-color: green;
  margin-right: 20px;
  cursor: pointer;
  color: white;
`;
const Input = styled.input``;

const ShareImageContainer = styled.div`
  padding: 0 20px 10px 20px;
  position: relative;
`;
const ShareImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Share = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (null) {
      return;
    }
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchDp = async () => {
      const res = await axios.get(`/users?userId=${user._id}`);
      setImage(res.data);
    };
    fetchDp();
  }, [user]);

  return (
    <Container>
      <Wrapper>
        <Top>
          <Link to={`/profile/${user.username}`}>
            <ShareProfilePic
              src={
                image?.profilePicture
                  ? PF + image.profilePicture
                  : PF + "person/noAvatar.png"
              }
            />
          </Link>
          <ShareInput
            placeholder={"What's on your mind " + user.username + " ?"}
            ref={desc}
          />
        </Top>
        <Hr />
        {file && (
          <ShareImageContainer>
            <ShareImage src={URL.createObjectURL(file)} />
            <CancelIcon
              style={{
                position: "absolute",
                top: "0",
                right: "20px",
                cursor: "pointer",
                opacity: "0.7",
              }}
              onClick={() => setFile(null)}
            />
          </ShareImageContainer>
        )}
        <Bottom onSubmit={submitHandler}>
          <ShareOptions>
            <ShareOption htmlFor="file">
              <PermMediaIcon htmlColor="tomato" style={{ fontSize: 18 }} />
              <ShareOptionText>Photo or Video</ShareOptionText>
              <Input
                style={{ display: "none", cursor: "pointer" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </ShareOption>
            <ShareOption>
              <RoomIcon htmlColor="green" style={{ fontSize: 18 }} />
              <ShareOptionText>Location</ShareOptionText>
            </ShareOption>
            <ShareOption>
              <EmojiEmotionsIcon
                htmlColor="goldenrod"
                style={{ fontSize: 18 }}
              />
              <ShareOptionText>Feeling/Activity</ShareOptionText>
            </ShareOption>
          </ShareOptions>
          <Button type="submit">Share</Button>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Share;
