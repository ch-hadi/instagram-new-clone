// src/components/ChatInput.js
import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 border-t border-gray-300">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' ? handleSend() : null}
      />
    </div>
  );
};

export default ChatInput;
