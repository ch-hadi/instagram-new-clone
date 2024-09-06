import React from 'react'
import { PlusCircle } from 'lucide-react'



const Stories= ({ stories }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide">
          <div className="flex flex-col items-center space-y-1 flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <PlusCircle size={24} className="text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Your Story</span>
          </div>
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px] ${story.hasUnseenStory ? '' : 'opacity-50'}`}>
                <img
                  src={story.imageUrl}
                  alt={`${story.username}'s story`}
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                />
              </div>
              <span className="text-xs">{story.username}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stories