// src/components/ChatHeader.js
import React from 'react';

const ChatHeader = ({ activeFriend }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
      <h2 className="text-lg font-bold">{activeFriend.name}</h2>
      <span className={`text-sm ${activeFriend.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
        {activeFriend.isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
};

export default ChatHeader;
