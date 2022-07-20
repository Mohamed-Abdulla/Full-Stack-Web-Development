import styled from "styled-components";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Rightbar from "../components/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { update } from "../apiCalls";

const ProfileContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;
const Right = styled.div`
  flex: 9;
`;
const RightTop = styled.div``;
const ProfileCover = styled.form`
  height: 450px;
  position: relative;
`;
const CoverPic = styled.img`
  width: 1100px;
  height: 400px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  object-fit: cover !important;
`;

const EditCover = styled.label`
  position: absolute;
  bottom: 70px;
  right: 33px;
  /* background-color: #f2f2f2; */
  background-color: ${({ theme }) => theme.bgLighter};

  padding: 8px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
`;
const ProfilePic = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 300px;
  border: 3px solid white;
`;
const EditProfile = styled.label`
  position: absolute;
  right: 475px;
  bottom: 8px;
  /* background-color: #f2f2f2; */
  background-color: ${({ theme }) => theme.bgLighter};

  padding: 8px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProfileInfoName = styled.h4`
  font-size: 24px;
`;
const ProfileInfoDesc = styled.span`
  font-weight: 300;
`;

const RightBottom = styled.div`
  display: flex;
`;
const Input = styled.input``;
const CoverPicContainer = styled.div``;

const CoverUpload = styled.button`
  position: absolute;
  border: none;
  background-color: transparent;
  top: 345px;
  right: 0;
`;
const ProfileUpload = styled.button`
  position: absolute;
  border: none;
  background-color: transparent;
  right: 430px;
  bottom: 15px;
`;

const Profile = ({ darkMode, setDarkMode }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newDP = {
      userId: user._id,
    };
    if (null) {
      return;
    }
    if (profilePic) {
      const data = new FormData();
      const fileName = Date.now() + profilePic.name;
      data.append("name", fileName);
      data.append("file", profilePic);
      newDP.profilePicture = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    if (coverPic) {
      const data = new FormData();
      const fileName = Date.now() + coverPic.name;
      data.append("name", fileName);
      data.append("file", coverPic);
      newDP.coverPicture = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.patch("/users/" + user._id, newDP);
      update(user._id, newDP, dispatch);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/users?username=${username}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      {loading ? (
        <Skeleton type="circle" />
      ) : (
        <>
          <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />

          <ProfileContainer>
            <Sidebar />
            <Right>
              <RightTop>
                <ProfileCover onSubmit={submitHandler}>
                  <CoverPicContainer>
                    <Link to={"/FullScreen/cover/" + user.username}>
                      {coverPic ? (
                        <CoverPic src={URL.createObjectURL(coverPic)} />
                      ) : (
                        <CoverPic
                          src={
                            user.coverPicture
                              ? PF + user.coverPicture
                              : "https://media-exp1.licdn.com/dms/image/C5616AQH4v01QIau5tA/profile-displaybackgroundimage-shrink_350_1400/0/1563753751845?e=1663200000&v=beta&t=_LmHl_CnE3ROFemFU0GfPNjdZaa4DPqOJ0SdpVHGVeQ"
                          }
                        />
                      )}
                    </Link>
                  </CoverPicContainer>
                  {coverPic && (
                    <>
                      <CoverUpload type="submit">
                        <FileUploadIcon />
                      </CoverUpload>

                      <CancelIcon
                        onClick={() => setCoverPic(null)}
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "20px",
                          cursor: "pointer",
                          opacity: "1",
                        }}
                      />
                    </>
                  )}

                  {user.username === currentUser.username && (
                    <EditCover htmlFor="coverPic">
                      <CameraAltOutlinedIcon /> Edit Cover Photo
                      <Input
                        style={{ display: "none", cursor: "pointer" }}
                        type="file"
                        id="coverPic"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => setCoverPic(e.target.files[0])}
                      />
                    </EditCover>
                  )}

                  <Link to={"/FullScreen/profile/" + user.username}>
                    {!profilePic ? (
                      <ProfilePic
                        src={
                          user.profilePicture
                            ? PF + user.profilePicture
                            : PF + "person/noAvatar.png"
                        }
                      />
                    ) : (
                      <ProfilePic src={URL.createObjectURL(profilePic)} />
                    )}
                  </Link>
                  {user.username === currentUser.username && (
                    <EditProfile htmlFor="profilePic">
                      <CameraAltOutlinedIcon />
                      <Input
                        style={{ display: "none", cursor: "pointer" }}
                        type="file"
                        id="profilePic"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                      />
                    </EditProfile>
                  )}

                  {profilePic && (
                    <>
                      <ProfileUpload type="submit">
                        <FileUploadIcon />
                      </ProfileUpload>
                      <CancelIcon
                        onClick={() => setProfilePic(null)}
                        style={{
                          position: "absolute",
                          bottom: "120px",
                          right: " 480px",
                          cursor: "pointer",
                          opacity: "1",
                        }}
                      />
                    </>
                  )}
                </ProfileCover>

                <ProfileInfo>
                  <ProfileInfoName>{user.username}</ProfileInfoName>
                  <ProfileInfoDesc>({user.desc})</ProfileInfoDesc>
                </ProfileInfo>
              </RightTop>
              <RightBottom>
                <Feed username={username} />
                <Rightbar user={user} />
              </RightBottom>
            </Right>
          </ProfileContainer>
        </>
      )}
    </>
  );
};

export default Profile;
