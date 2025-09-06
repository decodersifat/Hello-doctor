import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  Clock, 
  FileText, 
  ArrowRight,
  Bot,
  User,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ChatCard = ({ chat, index }) => {
  const navigate = useNavigate();

  const getReportTypeIcon = (type) => {
    const icons = {
      blood_test: "🩸",
      urine_test: "🧪",
      mri: "🧲",
      xray: "📸",
      other: "📋"
    };
    return icons[type] || "📋";
  };

  const getReportTypeDisplay = (type) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getLastMessage = () => {
    if (!chat.lastMessage) return "No messages yet";
    return chat.lastMessage.length > 100 
      ? chat.lastMessage.substring(0, 100) + "..."
      : chat.lastMessage;
  };

  const getMessageCount = () => {
    return chat.messageCount || 0;
  };

  const handleChatClick = () => {
    navigate(`/user/chat/${chat.report._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="w-full"
    >
      <Card 
        className="relative w-full overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-blue-200"
        onClick={handleChatClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl">
                {getReportTypeIcon(chat.report.reportType)}
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {chat.report.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 mt-1">
                  {getReportTypeDisplay(chat.report.reportType)}
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge 
                variant="secondary" 
                className="bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                {getMessageCount()} messages
              </Badge>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Last Message Preview */}
          <div className="mb-4">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {getLastMessage()}
                </p>
              </div>
            </div>
          </div>

          {/* Report Description */}
          {chat.report.description && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                {chat.report.description}
              </p>
            </div>
          )}

          {/* Footer with Date and Time */}
          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(chat.report.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatTime(chat.updatedAt)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-blue-500 group-hover:text-blue-600">
              <MessageCircle className="w-3 h-3" />
              <span className="font-medium">Continue Chat</span>
            </div>
          </div>
        </CardContent>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-lg transition-colors duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  );
};

export default ChatCard;

