import React from 'react';
import ProfileLayout from './ProfileLayout';
import WelcomeBanner from './WelcomeBanner';
import Post from './Post';
import { TyporateWidget } from './Widgets';
import InteractiveDiary from './InteractiveDiary';
import ProfileCard from './ProfileCard';
import SarcasticQuote from './SarcasticQuote';
import { motion } from 'framer-motion';

interface PostData {
  id: number;
  author: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

const HomePage: React.FC = () => {
  const posts: PostData[] = [
    {
      id: 1,
      author: 'Tech Archon',
      time: '2h ago',
      content: 'Just deployed a new neural gateway for the CSI network. The latency is practically non-existent. #CSI #TechProtocol',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop',
      likes: 120,
      comments: 45
    },
    {
      id: 2,
      author: 'Dimensional Recruiter',
      time: '4h ago',
      content: 'Looking for a Senior Reality Architect to join our team. Must have experience with multi-threaded timeline management. 🚀 #Jobs #TechFutures',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop',
      likes: 85,
      comments: 12
    },
    {
      id: 3,
      author: 'System Override',
      time: '6h ago',
      content: 'Late night hackathon vibes. The caffeine is flowing and the code is compiling. Who else is grinding tonight? 💻☕ #DevLife #Hackathon',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop',
      likes: 243,
      comments: 56
    },
    {
      id: 4,
      author: 'Event Horizon',
      time: '12h ago',
      content: 'The main stage is set for the "Future of AI" summit. Can\'t wait to see what the speakers have in store for us. It\'s going to be legendary. 🎤✨ #AI #Summit',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50935339?q=80&w=2670&auto=format&fit=crop',
      likes: 567,
      comments: 120
    },
    {
      id: 5,
      author: 'Global Network',
      time: '1d ago',
      content: 'Visualizing the data streams from our latest satellite launch. The connectivity is spanning across the globe beautifully. 🌍📡 #Space #Data',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop',
      likes: 890,
      comments: 230
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-[calc(100vh-80px)] overflow-hidden relative"
    >



      <div className="h-full w-full max-w-[1400px] mx-auto px-6">
        <ProfileLayout>
          {/* Left Sidebar - Stationary */}
          <aside className="hidden lg:flex flex-col gap-6 pt-4 pb-20">
            <div className="animate-float" style={{ animationDelay: '0s' }}>
              <ProfileCard />
            </div>
            <div className="animate-float" style={{ animationDelay: '0.2s' }}>
              <TyporateWidget />
            </div>
          </aside>

          {/* Middle Feed - SCROLL TRAP (Block Stack, No-Shrink) */}
          <div
            id="middle-feed-scroll"
            className="main-content overflow-y-auto h-full no-scrollbar scroll-smooth"
            onWheel={(e) => {
              const container = e.currentTarget;
              const isAtTop = container.scrollTop === 0;
              const isAtBottom = Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 2;

              // Trap downward scroll if not at bottom
              if (e.deltaY > 0 && !isAtBottom) {
                e.stopPropagation();
              }
              // Trap upward scroll if not at top
              else if (e.deltaY < 0 && !isAtTop) {
                e.stopPropagation();
              }
              // Bubbles to normal page scroll at boundaries
            }}
          >
            <div className="space-y-6 pt-4 pb-24 w-full h-auto">
              <WelcomeBanner />

              {posts.map(post => (
                <Post key={post.id} {...post} />
              ))}

              {/* Additional Feed content to ensure scrolling */}
              {[3, 4, 5, 6, 7, 8, 9, 10].map(id => (
                <Post
                  key={id}
                  author="Xenia Intelligence"
                  time="Active now"
                  content="Maintaining perfect visual integrity. This middle column behaves as a natural block container, ensuring every post retains its uncompressed width and full feature set. No flex-shrinking, no constraints—just a professional desktop stream."
                  likes={450 + id}
                  comments={88 + id}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar - Stationary */}
          <aside className="hidden xl:flex flex-col gap-3 pt-4 pb-20">
            <div className="animate-float" style={{ animationDelay: '0.5s' }}>
              <InteractiveDiary />
            </div>
            <div className="animate-float" style={{ animationDelay: '0.8s' }}>
              <SarcasticQuote />
            </div>
          </aside>
        </ProfileLayout>
      </div>
      <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .no-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .no-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(59, 130, 246, 0.1);
                    border-radius: 10px;
                }
                .no-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(59, 130, 246, 0.2);
                }
            `}</style>
    </motion.div>
  );
};

export default HomePage;
