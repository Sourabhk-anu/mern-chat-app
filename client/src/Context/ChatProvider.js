import React, { createContext, useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [chats, setChats] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);

  // const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    // if (!userInfo) 
    //   history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        notification, 
        setNotification
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;