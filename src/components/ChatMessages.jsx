// src/components/ChatMessages.js
import React from 'react';

const ChatMessages = ({ messages }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((msg, index) => (
        <div key={index} className={`flex mb-4 ${msg.isMine ? 'justify-end' : ''}`}>
          <div className={`p-2 rounded ${msg.isMine ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
