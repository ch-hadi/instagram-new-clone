import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import InstagramPost from '../../components/Posts/PostsContainex'
import ChatContainer from '../../components/ChatContainer'
import Stories from '../../components/Stories/Stories'

const Main = () => {
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [activeView, setActiveView] = useState('posts');
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
            { text: 'Good morning! Whats up?', isMine: true },
        ],
    });

    const [stories] = useState([
        { id: 1, username: 'john_doe', imageUrl: 'https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg?height=64&width=64', hasUnseenStory: true },
        { id: 2, username: 'jane_smith', imageUrl: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg?height=64&width=64', hasUnseenStory: true },
        { id: 3, username: 'alex_wilson', imageUrl: 'https://www.adorama.com/alc/wp-content/uploads/2018/05/photographer-stacey-rozells-288200-unsplash-370x280.jpg?height=64&width=64', hasUnseenStory: true },
        { id: 4, username: 'emily_brown', imageUrl: 'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg?height=64&width=64', hasUnseenStory: true },
        { id: 5, username: 'mike_johnson', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmCqPQkaJwpCsMG4znVnNw3fie_li_N3kL3R4Cecusrs4Z2hKL7TjCnyd4UGzzaGkz0Qo&usqp=CAU?height=64&width=64', hasUnseenStory: true },
    ]);

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
        setActiveFriend(friend);
        setActiveView('chats');
    };

    const handleViewChange = (view) => {
        setActiveView(view);
    };

    return (
        <div className='flex h-screen overflow-hidden'>
        <Sidebar 
            onSelectFriend={handleSelectFriend} 
            friends={friends} 
            onViewChange={handleViewChange}
        />
        <div className="flex-grow overflow-y-auto bg-gray-100">
            {activeView === 'posts' && <Stories stories={stories} />}
            <div className={`max-w-3xl mx-auto py-8 px-4 space-y-8 ${activeView === 'posts' ? 'mt-24' : ''}`}>
                {activeView === 'posts' ? (
                    <>
                        <InstagramPost />
                        <InstagramPost />
                        <InstagramPost />
                    </>
                ) : (
                    <ChatContainer
                        activeFriend={activeFriend}
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        onViewInfo={() => setShowFriendDetail(true)}
                    />
                )}
            </div>
        </div>
    </div>
    )
}

export default Main