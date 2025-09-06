import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/magicui/magic-card";
import { WarpBackground } from "@/components/magicui/warp-background";
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card";
import { BorderBeam } from '@/components/magicui/border-beam';
import Navbar from '../components/Navbar';
import ChatCard from '../components/ChatCard';
import { useNavigate } from 'react-router-dom';
import { 
  Loader2, 
  MessageCircle, 
  Plus, 
  AlertCircle,
  RefreshCw,
  User,
  Mail,
  Phone,
  UserCheck,
  LogOut
} from 'lucide-react';

function Profile() {
  const navigate = useNavigate();
  const generatedAt = new Date().toLocaleString();

  const API = "http://localhost:3000/api/v1/auth/me"
  const LogoutEndPoint = "http://localhost:3000/api/v1/auth/logout"

  const [user, setUser] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    phone: '',
    gender: ''
  });

  const [chats, setChats] = useState([]);
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [chatError, setChatError] = useState('');

  const fetchChats = async () => {
    try {
      setIsLoadingChats(true);
      setChatError('');
      const response = await axios.get('http://localhost:3000/api/v1/chat/reports', {
        withCredentials: true
      });
      
      if (response.data.success) {
        setChats(response.data.chats);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
      setChatError('Failed to load your chat history');
    } finally {
      setIsLoadingChats(false);
    }
  };

  useEffect(() => {
    // Fetch user data
    axios.get(API).then(
      (response) => {
        setUser(response.data.user)
        console.log(`Data ${response.data}`)
      }
    ).catch(
      (e) => {
        console.log(`Error on Getting API ${e}`)
      }
    );

    // Fetch chat data
    fetchChats();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Navbar />

      {/* Sidebar/Profile */}
      <div className="w-full lg:w-1/3 p-4 lg:p-6 flex flex-col items-center">
        <div className='h-15'>
        </div>
        <WarpBackground>
          <div className="flex flex-col items-center gap-6 w-full max-w-md">

            {/* Enhanced Avatar Section */}
            <div className="relative">
              <div className="avatar transition-all transform hover:scale-105 duration-300">
                <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full ring-4 ring-blue-500/20 ring-offset-4 ring-offset-white overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100">
                  <img
                    className='w-full h-full object-cover'
                    src={`http://localhost:3000/images/${user.img}`}
                    alt="Profile Avatar"
                  />
                </div>
              </div>
              {/* Status indicator */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg"></div>
            </div>

            {/* Enhanced Profile Card */}
            <MagicCard className="w-full backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
              <BorderBeam size={250} duration={12} delay={9} />
              <div className="p-6 space-y-6">
                {/* Name Section */}
                <div className="text-center space-y-2">
                  <h2 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    {`${user.fname} ${user.lname}`}
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
                </div>

                {/* Details Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Phone</p>
                      <p className="text-gray-800 font-semibold">{user.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Email</p>
                      <p className="text-gray-800 font-semibold break-all">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Gender</p>
                      <p className="text-gray-800 font-semibold capitalize">{user.gender}</p>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <Button
                  onClick={() => {
                    axios.post(LogoutEndPoint, {}, { withCredentials: true })
                      .then(() => {
                        navigate('/signin', { replace: true });
                      })
                      .catch((error) => {
                        console.error("Logout failed:", error);
                      });
                  }}
                  className='w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]'
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </Button>
              </div>
            </MagicCard>

          </div>
        </WarpBackground>
      </div>

      <div className="w-full lg:w-2/3 p-4 lg:p-6 flex flex-col">
        <div className='h-20'>
        </div>
        <div className="text-gray-700 text-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Chat History</h2>
            <div className="flex items-center gap-2">
              <Button
                onClick={fetchChats}
                disabled={isLoadingChats}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingChats ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                onClick={() => navigate('/user/testchat')}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {isLoadingChats && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
                <p className="text-gray-600">Loading your chats...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {chatError && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-500" />
                <p className="text-red-600 mb-4">{chatError}</p>
                <Button onClick={fetchChats} variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoadingChats && !chatError && chats.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Chats Yet</h3>
                <p className="text-gray-600 mb-6">Start your first AI medical consultation by uploading a report.</p>
                <Button
                  onClick={() => navigate('/user/testchat')}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Your First Report
                </Button>
              </div>
            </div>
          )}

          {/* Chat Cards Grid */}
          {!isLoadingChats && !chatError && chats.length > 0 && (
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {chats.map((chat, index) => (
                <ChatCard key={chat.report._id} chat={chat} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;