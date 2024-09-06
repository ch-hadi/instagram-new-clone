// src/components/DetailPage.js
import React, { useState } from 'react';
import { Bell, Info } from 'lucide-react';

const DetailPage = ({ friend,onBack }) => {
  const [activeTab, setActiveTab] = useState('liked');

  const renderContent = () => {
    switch (activeTab) {
      case 'liked':
        return <div>Liked/Suggested Pages Content</div>;
      case 'shared':
        return <div>Shared Files and Media Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {/* <button 
          onClick={onBack} 
          className="text-blue-500 hover:text-blue-700"
        >
          &larr; Back to Chat
        </button> */}
      </div>

      <div className="flex items-center justify-between bg-gray-800 text-white p-4 shadow-md">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${friend.isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
          <h2 className="text-lg font-semibold">{friend.name}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white">
            <Bell className="w-6 h-6" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Info className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        <button
          className={`flex-1 p-4 ${activeTab === 'liked' ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-100`}
          onClick={() => setActiveTab('liked')}
        >
          Liked/Suggested Pages
        </button>
        <button
          className={`flex-1 p-4 ${activeTab === 'shared' ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-100`}
          onClick={() => setActiveTab('shared')}
        >
          Shared Files/Media
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default DetailPage;
