import React, { useState, useContext } from "react";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Upload, 
  FileText, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ArrowLeft,
  Stethoscope
} from "lucide-react";
import { motion } from "framer-motion";

const TestChatPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [testType, setTestType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_BASE = "http://localhost:3000/api/v1/chat";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Please upload a valid file (JPEG, PNG, GIF, PDF, or TXT)");
        return;
      }
      
      // Validate file size (10MB max)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      
      setFile(selectedFile);
      setError("");
      
      // Auto-generate title if not provided
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleStartChat = async () => {
    if (!testType) {
      setError("Please select a test type.");
      return;
    }
    if (!title.trim()) {
      setError("Please provide a title for your report.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append('reportType', testType);
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      if (file) {
        formData.append('file', file);
      }

      const response = await axios.post(`${API_BASE}/create-report`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccess("Report created successfully! Starting chat...");
        
        // Navigate to chat page after a short delay
        setTimeout(() => {
          navigate(`/user/chat/${response.data.report._id}`);
        }, 1500);
      }
    } catch (error) {
      console.error("Error creating report:", error);
      setError(error.response?.data?.message || "Failed to create report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getTestTypeIcon = (type) => {
    const icons = {
      blood_test: "🩸",
      urine_test: "🧪",
      mri: "🧲",
      xray: "📸",
      other: "📋"
    };
    return icons[type] || "📋";
  };

  const getTestTypeDescription = (type) => {
    const descriptions = {
      blood_test: "Complete Blood Count, Lipid Panel, etc.",
      urine_test: "Urinalysis, Microalbumin, etc.",
      mri: "Magnetic Resonance Imaging scans",
      xray: "X-Ray images and radiographs",
      other: "Other medical reports and documents"
    };
    return descriptions[type] || "Medical report";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Upload Medical Report
                </h1>
                <p className="text-sm text-gray-500">
                  Upload your medical report to start an AI-powered analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-gray-900">
                Start Your AI Analysis
              </CardTitle>
              <p className="text-center text-gray-600">
                Upload your medical report and get instant AI-powered insights
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6 p-6">
              {/* Test Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="testType" className="text-sm font-medium">
                  Report Type *
                </Label>
                <Select
                  value={testType}
                  onValueChange={(value) => {
                    setTestType(value);
                    setError("");
                  }}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose your report type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blood_test">
                      <div className="flex items-center gap-2">
                        <span>{getTestTypeIcon("blood_test")}</span>
                        <span>Blood Test</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="urine_test">
                      <div className="flex items-center gap-2">
                        <span>{getTestTypeIcon("urine_test")}</span>
                        <span>Urine Test</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="mri">
                      <div className="flex items-center gap-2">
                        <span>{getTestTypeIcon("mri")}</span>
                        <span>MRI Scan</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="xray">
                      <div className="flex items-center gap-2">
                        <span>{getTestTypeIcon("xray")}</span>
                        <span>X-Ray</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="other">
                      <div className="flex items-center gap-2">
                        <span>{getTestTypeIcon("other")}</span>
                        <span>Other</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {testType && (
                  <p className="text-xs text-gray-500">
                    {getTestTypeDescription(testType)}
                  </p>
                )}
              </div>

              {/* Report Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Report Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Annual Blood Work, Chest X-Ray"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setError("");
                  }}
                  className="h-12"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Add any additional context about your report..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="fileUpload" className="text-sm font-medium">
                  Upload File (Optional)
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    id="fileUpload"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,.pdf,.txt"
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF, TXT up to 10MB
                    </p>
                  </label>
                </div>
                {file && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <FileText className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">{file.name}</span>
                    <span className="text-xs text-green-600">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">{success}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                onClick={handleStartChat}
                disabled={!testType || !title.trim() || isLoading}
                className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Report...
                  </>
                ) : (
                  <>
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Start AI Analysis
                  </>
                )}
              </Button>

              {/* Info */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Your report will be analyzed by our AI assistant to help you understand your medical results.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TestChatPage;
