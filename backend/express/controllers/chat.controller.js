const Chat = require("../models/chat.models");
const Report = require("../models/report.models");
const User = require("../models/user.models");
const pdf = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Extract text from PDF file
const extractPDFText = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    return null;
  }
};

// Create a new report and start chat
const createReportAndChat = async (req, res) => {
  try {
    const { reportType, title, description } = req.body;
    const userId = req.user._id;
    
    let extractedText = null;
    
    // If a PDF file is uploaded, extract text from it
    if (req.file && req.file.mimetype === 'application/pdf') {
      const filePath = path.join(__dirname, '../public', req.file.filename);
      extractedText = await extractPDFText(filePath);
      
      if (!extractedText) {
        return res.status(400).json({
          success: false,
          message: "Failed to extract text from PDF. Please ensure the PDF contains readable text.",
        });
      }
    }

    // Create report with extracted text
    const report = await Report.create({
      user: userId,
      reportType,
      title,
      description,
      fileUrl: req.file ? req.file.filename : null,
      extractedText: extractedText,
    });

    // Create initial AI welcome message with context about the extracted text
    let welcomeMessage;
    if (extractedText) {
      welcomeMessage = await Chat.create({
        report: report._id,
        sender: "ai",
        message: `Hello! I've received and analyzed your ${reportType.replace('_', ' ')} report. I've extracted the text content from your PDF and I'm ready to help you understand your medical results. What specific aspects would you like me to explain?`,
      });
    } else {
      welcomeMessage = await Chat.create({
        report: report._id,
        sender: "ai",
        message: `Hello! I've received your ${reportType.replace('_', ' ')} report information. I'm here to help you understand your medical results. What would you like to know about your report?`,
      });
    }

    res.status(201).json({
      success: true,
      report,
      message: welcomeMessage,
      extractedText: extractedText ? "Text successfully extracted from PDF" : null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Send a message in chat
const sendMessage = async (req, res) => {
  try {
    const { reportId, message } = req.body;
    const userId = req.user._id;

    // Verify report belongs to user
    const report = await Report.findOne({ _id: reportId, user: userId });
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Save user message
    const userMessage = await Chat.create({
      report: reportId,
      sender: "user",
      message,
    });

    // Generate AI response (simplified for now)
    const aiResponse = await generateAIResponse(message, report);
    
    const aiMessage = await Chat.create({
      report: reportId,
      sender: "ai",
      message: aiResponse,
    });

    res.status(200).json({
      success: true,
      messages: [userMessage, aiMessage],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get chat history for a report
const getChatHistory = async (req, res) => {
  try {
    const { reportId } = req.params;
    const userId = req.user._id;

    // Verify report belongs to user
    const report = await Report.findOne({ _id: reportId, user: userId });
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Get all messages for this report
    const messages = await Chat.find({ report: reportId })
      .sort({ createdAt: 1 })
      .populate('report', 'title reportType');

    res.status(200).json({
      success: true,
      messages,
      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all user's reports with chat data
const getUserReports = async (req, res) => {
  try {
    const userId = req.user._id;

    const reports = await Report.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('user', 'fname lname email');

    // Get chat data for each report
    const reportsWithChatData = await Promise.all(
      reports.map(async (report) => {
        const chatMessages = await Chat.find({ report: report._id })
          .sort({ createdAt: -1 })
          .limit(1);

        const messageCount = await Chat.countDocuments({ report: report._id });
        
        return {
          report,
          lastMessage: chatMessages.length > 0 ? chatMessages[0].message : null,
          messageCount,
          updatedAt: chatMessages.length > 0 ? chatMessages[0].createdAt : report.createdAt,
        };
      })
    );

    res.status(200).json({
      success: true,
      chats: reportsWithChatData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Generate AI response using Google Gemini with PDF text context
const generateAIResponse = async (userMessage, report) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Build context prompt with extracted text if available
    let contextPrompt = `You are a helpful medical AI assistant. Your role is to help patients understand their medical reports in simple, clear language. Always remind users that this is for educational purposes only and they should consult their healthcare provider for medical advice.

User's question: "${userMessage}"

Report Type: ${report.reportType.replace('_', ' ')}
Report Title: ${report.title}`;

    if (report.description) {
      contextPrompt += `\nReport Description: ${report.description}`;
    }

    if (report.extractedText && report.extractedText.length > 0) {
      contextPrompt += `\n\nMedical Report Content:\n${report.extractedText}`;
      contextPrompt += `\n\nPlease analyze the above medical report content and answer the user's question. Reference specific values, findings, or sections from the report when relevant. Explain medical terms in simple language and provide context about what the results might mean.`;
    } else {
      contextPrompt += `\n\nNote: No specific report content was provided. Please provide general guidance about ${report.reportType.replace('_', ' ')} reports and encourage the user to share specific values or findings for more detailed analysis.`;
    }

    contextPrompt += `\n\nImportant: Always remind the user that this analysis is for educational purposes only and they should discuss their results with their healthcare provider for proper medical interpretation and advice.`;

    const result = await model.generateContent(contextPrompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error('Error generating AI response:', error);
    
    // Fallback response if Gemini API fails
    const hasExtractedText = report.extractedText && report.extractedText.length > 0;
    
    if (hasExtractedText) {
      return "I apologize, but I'm having trouble accessing the AI service right now. However, I can see that you've uploaded a medical report. Could you please ask me a specific question about your results, and I'll do my best to help you understand them? Remember, this is for educational purposes only, and you should always consult your healthcare provider for medical advice.";
    } else {
      return "I apologize, but I'm having trouble accessing the AI service right now. Could you please share some specific details from your medical report so I can try to help you understand them? Remember, this is for educational purposes only, and you should always consult your healthcare provider for medical advice.";
    }
  }
};

module.exports = {
  createReportAndChat,
  sendMessage,
  getChatHistory,
  getUserReports,
};
