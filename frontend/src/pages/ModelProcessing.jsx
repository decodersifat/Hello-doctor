import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Progress } from '../../components/ui/progress';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { 
  Upload, 
  FileText, 
  Download, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ArrowLeft,
  Brain,
  X,
  Heart,
  Eye,
  Activity,
  FileImage,
  File,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const ModelProcessing = () => {
  const { modelType } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [reportData, setReportData] = useState(null);
  const [processingStep, setProcessingStep] = useState('');

  const API_BASE = "http://localhost:3000/api/v1/model";

  const modelConfigs = {
    mri: {
      name: 'MRI Model',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200',
      fileTypes: ['.nii', '.nii.gz', '.dcm', '.dicom'],
      description: 'Process MRI scans and generate detailed reports'
    },
    xray: {
      name: 'X-Ray Model',
      icon: X,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      fileTypes: ['.dcm', '.dicom', '.jpg', '.png'],
      description: 'Analyze X-Ray images for abnormalities'
    },
    ecg: {
      name: 'ECG Model',
      icon: Heart,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      fileTypes: ['.xml', '.txt', '.csv', '.json'],
      description: 'Process ECG readings and detect heart conditions'
    },
    ct: {
      name: 'CT Scan Model',
      icon: Eye,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
      fileTypes: ['.dcm', '.dicom', '.nii', '.nii.gz'],
      description: 'Analyze CT scans for detailed medical insights'
    }
  };

  const currentModel = modelConfigs[modelType] || modelConfigs.mri;
  const IconComponent = currentModel.icon;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
      if (!currentModel.fileTypes.includes(fileExtension)) {
        setError(`Please upload a valid file. Supported formats: ${currentModel.fileTypes.join(', ')}`);
        return;
      }
      
      // Validate file size (100MB max for medical files)
      if (selectedFile.size > 100 * 1024 * 1024) {
        setError('File size must be less than 100MB');
        return;
      }
      
      setFile(selectedFile);
      setError('');
      setSuccess('');
    }
  };

  const simulateProcessing = () => {
    const steps = [
      'Uploading file...',
      'Validating file format...',
      'Preprocessing data...',
      'Running AI analysis...',
      'Generating report...',
      'Creating PDF...',
      'Finalizing...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProcessingStep(steps[currentStep]);
        setProgress((currentStep + 1) * (100 / steps.length));
        currentStep++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setSuccess('Processing completed successfully!');
        setReportData({
          id: Date.now().toString(),
          fileName: file.name,
          modelType: currentModel.name,
          processedAt: new Date().toISOString(),
          reportUrl: '/api/reports/sample-report.pdf' // This would be the actual PDF URL
        });
      }
    }, 1000);
  };

  const handleProcessFile = async () => {
    if (!file) {
      setError('Please select a file to process');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess('');
    setProgress(0);
    setReportData(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('modelType', modelType);
      formData.append('userId', user._id);

      // Start the processing simulation
      simulateProcessing();

      // Call the actual API
      const response = await axios.post(`${API_BASE}/process`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setSuccess('File processed successfully!');
        setReportData(response.data.data);
      }

    } catch (error) {
      console.error('Error processing file:', error);
      setError(error.response?.data?.message || 'Failed to process file. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleDownloadReport = async () => {
    if (reportData) {
      try {
        const response = await axios.get(`${API_BASE}/download/${reportData.reportId}`, {
          withCredentials: true,
          responseType: 'blob'
        });
        
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = `${reportData.fileName}_report.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading report:', error);
        setError('Failed to download report. Please try again.');
      }
    }
  };

  const handleStartChat = () => {
    if (reportData) {
      // Navigate to chat with the processed report
      navigate(`/user/chat/${reportData.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
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
              <div className={`w-12 h-12 bg-gradient-to-br ${currentModel.color} rounded-full flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {currentModel.name} Processing
                </h1>
                <p className="text-sm text-gray-500">
                  Upload your medical file for AI analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Medical File
                </CardTitle>
                <CardDescription>
                  Upload your {currentModel.name.toLowerCase()} file for AI processing
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* File Upload Area */}
                <div className="space-y-4">
                  <Label htmlFor="fileUpload" className="text-sm font-medium">
                    Select File
                  </Label>
                  <div className={`border-2 border-dashed ${currentModel.borderColor} rounded-lg p-8 text-center hover:${currentModel.bgColor} transition-colors`}>
                    <input
                      id="fileUpload"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept={currentModel.fileTypes.join(',')}
                      disabled={isProcessing}
                    />
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      <div className={`w-16 h-16 bg-gradient-to-br ${currentModel.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <FileImage className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        {currentModel.fileTypes.join(', ')} up to 100MB
                      </p>
                    </label>
                  </div>
                  
                  {file && (
                    <div className={`flex items-center gap-3 p-3 ${currentModel.bgColor} border ${currentModel.borderColor} rounded-lg`}>
                      <File className="w-4 h-4 text-gray-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Processing Steps */}
                {isProcessing && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Processing Progress</span>
                        <span className="text-gray-900">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{processingStep}</span>
                    </div>
                  </div>
                )}

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

                {/* Process Button */}
                <Button
                  onClick={handleProcessFile}
                  disabled={!file || isProcessing}
                  className={`w-full ${currentModel.textColor} bg-current hover:opacity-90 font-semibold py-3`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Process with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Processing Results
                </CardTitle>
                <CardDescription>
                  Your AI-generated medical report will appear here
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {!reportData ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Report Yet
                    </h3>
                    <p className="text-gray-600">
                      Upload and process a file to generate your medical report
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Report Info */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Report Generated</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>File:</span>
                          <span className="font-medium">{reportData.fileName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Model:</span>
                          <span className="font-medium">{reportData.modelType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Processed:</span>
                          <span className="font-medium">
                            {new Date(reportData.processedAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button
                        onClick={handleDownloadReport}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF Report
                      </Button>
                      
                      <Button
                        onClick={handleStartChat}
                        variant="outline"
                        className="w-full border-blue-500 text-blue-500 hover:bg-blue-50"
                      >
                        <Activity className="w-4 h-4 mr-2" />
                        Chat with AI Doctor
                      </Button>
                    </div>

                    {/* Report Preview */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Report Preview</h5>
                      <div className="text-sm text-gray-600 space-y-2">
                        <p>• AI analysis completed successfully</p>
                        <p>• Detailed findings generated</p>
                        <p>• Recommendations provided</p>
                        <p>• Report ready for download</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Model Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <Card className={`${currentModel.bgColor} border ${currentModel.borderColor}`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${currentModel.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${currentModel.textColor} mb-2`}>
                    About {currentModel.name}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {currentModel.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Supported File Formats:</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentModel.fileTypes.map((type, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white rounded-full text-xs font-medium border"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ModelProcessing;
