import { useState } from 'react'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'

export default function InstagramPost() {
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([
    { user: 'johndoe', text: 'Great photo!' },
    { user: 'janedoe', text: 'Love it!' }
  ])

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setLiked(!liked)
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      setComments([...comments, { user: 'currentuser', text: comment }])
      setComment('')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
      {/* Post header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <img src="/placeholder.svg?height=32&width=32" alt="User avatar" className="w-8 h-8 rounded-full" />
          <span className="font-semibold text-sm">username</span>
        </div>
        <button className="text-gray-500">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post image */}
      <img src="https://g-2fsxnm6z7sv.vusercontent.net/placeholder.svg" alt="Post image" className="w-full h-auto" />

      {/* Post actions */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button onClick={handleLike} className={`${liked ? 'text-red-500' : 'text-gray-700'}`}>
              <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
            </button>
            <button className="text-gray-700">
              <MessageCircle size={24} />
            </button>
            <button className="text-gray-700">
              <Send size={24} />
            </button>
          </div>
          <button className="text-gray-700">
            <Bookmark size={24} />
          </button>
        </div>

        {/* Likes count */}
        <div className="font-semibold mb-2">{likes} likes</div>

        {/* Caption */}
        <div className="mb-2">
          <span className="font-semibold mr-2">username</span>
          <span>This is the post caption. #instagram #template</span>
        </div>

        {/* Comments */}
        <div className="text-gray-500 text-sm mb-2">View all {comments.length} comments</div>
        {comments.map((comment, index) => (
          <div key={index} className="mb-1">
            <span className="font-semibold mr-2">{comment.user}</span>
            <span>{comment.text}</span>
          </div>
        ))}

        {/* Add comment */}
        <form onSubmit={handleComment} className="mt-4 flex items-center">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-grow text-sm outline-none"
          />
          <button type="submit" className="text-blue-500 font-semibold ml-2">Post</button>
        </form>
      </div>
    </div>
  )
}