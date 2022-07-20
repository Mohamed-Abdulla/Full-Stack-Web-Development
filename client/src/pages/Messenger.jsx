import styled from "styled-components";
import Conversations from "../components/Chat/Conversations";
import Message from "../components/Chat/Message";
import Topbar from "../components/Topbar";
import SearchIcon from "@mui/icons-material/Search";
import ChatOnline from "../components/Chat/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 70px);
  display: flex;
`;
const Chatmenu = styled.div`
  flex: 3.5;
`;
const MenuWrapper = styled.div`
  padding: 10px;
  height: 100%;
`;
const MenuInput = styled.input`
  width: 90%;
  padding: 10px 0;
  border: none;
  margin-left: 10px;
  border-bottom: 1px solid gray;
  :focus {
    outline: none;
  }
`;
const ChatBox = styled.div`
  flex: 5.5;
`;
const BoxWrapper = styled.div`
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;
const BoxTop = styled.div`
  padding-right: 10px;
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
  }
`;

const BoxBottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MessageInput = styled.textarea`
  width: 80%;
  height: 90px;
  padding: 10px;
`;
const Send = styled.button`
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: teal;
  color: white;
  margin-right: 10px;
`;

const ChatOnlineContainer = styled.div`
  flex: 3;
`;
const OnlineWrapper = styled.div`
  padding: 10px;
  height: 100%;
`;
const NoConversation = styled.span`
  position: absolute;
  top: 10%;
  font-size: 50px;
  color: gray;
  text-align: center;
  cursor: default;
`;

const DataResult = styled.div`
  position: fixed;
  padding: 10px;
  /* top: 44px; */
  height: fit-content;
  width: 370px;
  margin-left: 30px;
  background-color: white;
  overflow: hidden;
  overflow-y: auto;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  ::-webkit-scrollbar {
    display: none;
  }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 12px;

  :hover {
    background-color: whitesmoke;
    border-radius: 10px;
  }
`;
const UserName = styled.span``;
const UserImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 7px;
`;
const HeaderImg = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  margin-right: 20px;
  cursor: pointer;
`;
const HeaderText = styled.span`
  font-weight: 500;
  color: black;
`;
const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const socket = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friendDetail, setFriendDetail] = useState([]);

  useEffect(() => {
    const friendId = currentChat?.members.filter((i) => i !== user._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setFriendDetail(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentChat]);

  //~socket io
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.following.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const startConvo = async (e) => {
    e.preventDefault();
    const convo = {
      members: [user._id, e.target.id],
    };
    try {
      const res = await axios.post("/conversations", convo);
      setMessages([...messages, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    const res = async () => {
      try {
        const res = await axios.get(`/users/search?username=${query}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    res();
  };

  return (
    <>
      <Topbar />
      <Container>
        <Chatmenu>
          <MenuWrapper>
            <SearchIcon style={{ color: "gray" }} />
            <MenuInput
              placeholder="Search for friends"
              onChange={handleSearch}
            />
            {query && (
              <DataResult>
                {data.map((user) => (
                  <Link to={"/profile/" + user.username}>
                    {data ? (
                      <User>
                        <UserImg
                          src={
                            user.profilePicture
                              ? PF + user.profilePicture
                              : PF + "person/noAvatar.png"
                          }
                        />
                        <UserName key={user._id}>{user.username}</UserName>
                      </User>
                    ) : (
                      <div>No results..</div>
                    )}
                  </Link>
                ))}
              </DataResult>
            )}
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversations
                  key={c._id}
                  conversation={c}
                  currentUser={user}
                />
              </div>
            ))}
          </MenuWrapper>
        </Chatmenu>
        <ChatBox>
          <BoxWrapper>
            <Header>
              <HeaderImg
                src={
                  friendDetail.profilePicture
                    ? PF + friendDetail.profilePicture
                    : PF + "person/noAvatar.png"
                }
              />
              <HeaderText>{friendDetail.username}</HeaderText>
            </Header>
            {currentChat ? (
              <>
                <BoxTop>
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        ownMessage={m.sender === user._id}
                        message={m}
                        currentUser={user}
                      />
                    </div>
                  ))}
                </BoxTop>
                <BoxBottom>
                  <MessageInput
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></MessageInput>
                  <Send onClick={handleSubmit}>Send</Send>
                </BoxBottom>
              </>
            ) : (
              <>
                <NoConversation>
                  Open a conversation to start a chat
                </NoConversation>
                <BoxTop>
                  {/* <div ref={scrollRef}>
                    <Message />
                  </div> */}
                </BoxTop>
                <BoxBottom>
                  <MessageInput
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></MessageInput>
                  <Send onClick={startConvo}>Send</Send>
                </BoxBottom>
              </>
            )}
          </BoxWrapper>
        </ChatBox>
        <ChatOnlineContainer>
          <OnlineWrapper>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </OnlineWrapper>
        </ChatOnlineContainer>
      </Container>
    </>
  );
};

export default Messenger;
