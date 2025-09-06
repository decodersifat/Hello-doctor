import React, { useState, useRef, useEffect, useContext } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Send, 
  Bot, 
  User, 
  FileText, 
  Loader2, 
  ArrowLeft,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const { reportId } = useParams();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const API_BASE = "http://localhost:3000/api/v1/chat";

  // Scroll to bottom when new message appears
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load chat history on component mount
  useEffect(() => {
    if (reportId) {
      loadChatHistory();
    }
  }, [reportId]);

  const loadChatHistory = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE}/history/${reportId}`, {
        withCredentials: true,
      });
      
      if (response.data.success) {
        setMessages(response.data.messages);
        setReport(response.data.report);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
      setError("Failed to load chat history");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      _id: Date.now().toString(),
      sender: "user",
      message: input.trim(),
      createdAt: new Date(),
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(
        `${API_BASE}/send-message`,
        {
          reportId,
          message: userMessage.message,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        // Add AI response
        setMessages(prev => [...prev, ...response.data.messages.slice(1)]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
      
      // Add error message
      const errorMessage = {
        _id: Date.now().toString() + "_error",
        sender: "ai",
        message: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        createdAt: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getReportTypeDisplay = (type) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const MessageBubble = ({ message, index }) => {
    const isUser = message.sender === "user";
    const isError = message.isError;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      >
        <div className={`flex items-start gap-3 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          {/* Avatar */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser 
              ? "bg-blue-500 text-white" 
              : isError 
                ? "bg-red-500 text-white" 
                : "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
          }`}>
            {isUser ? <User size={16} /> : <Bot size={16} />}
          </div>

          {/* Message Content */}
          <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
            <div className={`px-4 py-3 rounded-2xl ${
              isUser
                ? "bg-blue-500 text-white rounded-br-md"
                : isError
                  ? "bg-red-50 text-red-800 border border-red-200 rounded-bl-md"
                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm"
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.message}
              </p>
            </div>
            
            {/* Timestamp */}
            <span className="text-xs text-gray-500 mt-1 px-2">
              {formatTime(message.createdAt)}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600">Loading chat history...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={20} />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    AI Medical Assistant
                  </h1>
                  {report && (
                    <p className="text-sm text-gray-500">
                      {getReportTypeDisplay(report.reportType)} • {report.title}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle2 size={16} className="text-green-500" />
              <span>AI Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Welcome to AI Medical Assistant
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  I'm here to help you understand your medical report. Ask me anything about your test results!
                </p>
              </motion.div>
            ) : (
              messages.map((message, index) => (
                <MessageBubble key={message._id} message={message} index={index} />
              ))
            )}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-4 py-2">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                ref={inputRef}
                placeholder="Ask me anything about your medical report..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading || isTyping}
                className="min-h-[44px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || isTyping}
              className="h-11 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              {isLoading || isTyping ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
