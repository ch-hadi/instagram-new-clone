// src/components/ChatContainer.js
import React, { useEffect, useState } from 'react';
import { Bell, BellOff, Info } from 'lucide-react';  // Import Lucide icons
import { useSocket } from '../context/SocketContext';


const ChatContainer = ({ activeFriend, messages, onSendMessage, onViewInfo }) => {
  
  const socket = useSocket();
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false); // State to manage mute status

  const handleSendMessage = () => {
    if (socket && newMessage.trim()) {
      onSendMessage(newMessage);
      socket.emit('sendMessage', newMessage);
      setNewMessage('');
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev); // Toggle the mute state
  };

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (message) => {
        // Only update messages if not muted
        // if (!isMuted) {
          onSendMessage(message);
        // }
      });
      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [socket, onSendMessage]);
  return (
    <div className="flex flex-col w-full h-screen bg-white">
      {/* Enhanced Header with Mute and Info Buttons */}
      <div className="flex items-center justify-between bg-gray-800 text-white p-4 shadow-md">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${activeFriend.isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
          <h2 className="text-lg font-semibold">{activeFriend.name}</h2>
        </div>

        {/* Header Buttons */}
        <div className="flex items-center space-x-4">
          {/* Mute Button */}
          <button onClick={toggleMute} className="text-gray-400 hover:text-white">
            {isMuted ? <BellOff className="w-6 h-6 text-red-500" /> : <Bell className="w-6 h-6" />}
          </button>

          {/* View Info Button */}
          <button onClick={onViewInfo} className="text-gray-400 hover:text-white">
            <Info className="w-6 h-6" />
          </button>

          {/* Settings Button */}
          <button className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.isMine ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-4 py-2 rounded-full ${message.isMine ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input for New Message */}
      <div className="flex p-4 border-t border-gray-300">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
