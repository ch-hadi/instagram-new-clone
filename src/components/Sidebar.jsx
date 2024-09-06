import React, { useState } from 'react';
import { Home, MessageCircle, Search, PlusCircle } from 'lucide-react';

const Sidebar = ({ friends, onSelectFriend, onViewChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState('posts');

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewChange = (view) => {
    setActiveView(view);
    onViewChange(view);
  };

  return (
    <div className={`z-50 bg-gray-900 text-white h-screen p-4 flex flex-col transition-all duration-300 ease-in-out ${activeView === 'chats' ? 'w-64' : 'w-48'}`}>
      <div className="flex flex-col mb-6 space-y-2">
        <button
          onClick={() => handleViewChange('posts')}
          className={`flex items-center p-2 rounded-md ${activeView === 'posts' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
        >
          <Home size={24} className="mr-2" />
          <span className="text-sm font-medium">Home</span>
        </button>
        <button
          onClick={() => handleViewChange('chats')}
          className={`flex items-center p-2 rounded-md ${activeView === 'chats' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
        >
          <MessageCircle size={24} className="mr-2" />
          <span className="text-sm font-medium">Chats</span>
        </button>
      </div>

      {activeView === 'chats' && (
        <div className="flex-grow overflow-hidden">
          <div className="mb-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search friends..."
                className="w-full p-2 pl-10 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <h2 className="text-lg font-bold mb-2">Friends</h2>
          <ul className="overflow-y-auto flex-grow" style={{ maxHeight: 'calc(100vh - 240px)' }}>
            {filteredFriends.map((friend) => (
              <li 
                key={friend.id} 
                onClick={() => onSelectFriend(friend)} 
                className="flex items-center p-2 cursor-pointer hover:bg-gray-800 rounded mb-2"
              >
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                  <span className="text-xs font-bold">{friend.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{friend.name}</p>
                  <p className={`text-xs ${friend.isOnline ? 'text-green-400' : 'text-gray-500'}`}>
                    {friend.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold flex items-center justify-center">
            <PlusCircle size={18} className="mr-2" />
            <span className="text-sm">Add Friend</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;