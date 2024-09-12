// src/App.js
import React, { useState, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';
// import FriendDetail from './components/FriendDetails/FriendDetail';
import PostsContainer from './components/Posts/PostsContainex';
import { SocketProvider } from './context/SocketContext';
// import AppRoutes from './Routes/route';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './Routes/route';

// import {  } from 'react';

const App = () => {

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friends] = useState([
    { id: 1, name: 'Alice', isOnline: true },
    { id: 2, name: 'Bob', isOnline: false },
    { id: 3, name: 'Charlie', isOnline: true },
  ]);

  const [chats, setChats] = useState({
    1: [
      { text: 'Hello Alice!', isMine: false },
      { text: 'Hi Alice! How are you?', isMine: true },
    ],
    2: [
      { text: 'Hey Bob!', isMine: false },
      { text: 'Bob, long time no see!', isMine: true },
    ],
    3: [
      { text: 'Good morning, Charlie!', isMine: false },
      { text: 'Good morning! What’s up?', isMine: true },
    ],
  });

  const [activeFriend, setActiveFriend] = useState(friends[0]);
  const [showFriendDetail, setShowFriendDetail] = useState(false);

  const messages = chats[activeFriend.id] || [];

  const handleSendMessage = (message) => {
    setChats((prevChats) => ({
      ...prevChats,
      [activeFriend.id]: [
        ...(prevChats[activeFriend.id] || []),
        { text: message, isMine: true },
      ],
    }));
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  return (
    <AuthProvider>
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
