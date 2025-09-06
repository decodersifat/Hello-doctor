import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FileImage,
  File,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const MRIProcessing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [files, setFiles] = useState({
    flair: null,
    t1ce: null,
    t2: null,
    mask: null
  });
  const [patientData, setPatientData] = useState({
    first_name: user?.fname || '',
    last_name: user?.lname || '',
    age: user?.age || ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [results, setResults] = useState(null);

  const API_BASE = "http://localhost:8000/api"; // Django backend

  const handleFileChange = (fileType, e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['.nii', '.nii.gz'];
      const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        setError(`Please upload a valid NIfTI file (.nii or .nii.gz) for ${fileType.toUpperCase()}`);
        return;
      }
      
      // Validate file size (500MB max for medical files)
      if (selectedFile.size > 500 * 1024 * 1024) {
        setError('File size must be less than 500MB');
        return;
      }
      
      setFiles(prev => ({
        ...prev,
        [fileType]: selectedFile
      }));
      setError('');
    }
  };

  const handlePatientDataChange = (field, value) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const simulateProcessing = () => {
    const steps = [
      'Uploading files...',
      'Validating file formats...',
      'Preprocessing MRI sequences...',
      'Running AI tumor segmentation...',
      'Calculating tumor volumes...',
      'Generating analysis report...',
      'Creating PDF report...',
      'Finalizing results...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress((currentStep + 1) * (100 / steps.length));
        currentStep++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 2000);
  };

  const handleProcessMRI = async () => {
    // Validate all files are uploaded
    const missingFiles = Object.entries(files).filter(([key, file]) => !file);
    if (missingFiles.length > 0) {
      setError(`Please upload all required files: ${missingFiles.map(([key]) => key.toUpperCase()).join(', ')}`);
      return;
    }

    if (!patientData.first_name || !patientData.last_name || !patientData.age) {
      setError('Please fill in all patient information');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess('');
    setProgress(0);
    setResults(null);

    try {
      // Start processing simulation
      simulateProcessing();

      const formData = new FormData();
      
      // Add files in the correct order: FLAIR, T1CE, T2, Mask
      formData.append('files', files.flair);
      formData.append('files', files.t1ce);
      formData.append('files', files.t2);
      formData.append('files', files.mask);
      
      // Add patient data
      formData.append('patient_data', JSON.stringify(patientData));

      const response = await axios.post(`${API_BASE}/mri-process/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('API Response:', response.data);

      if (response.data.success) {
        setSuccess('MRI analysis completed successfully!');
        setResults(response.data.data);
      } else {
        setError(response.data.error || 'Unknown error occurred');
      }

    } catch (error) {
      console.error('Error processing MRI:', error);
      setError(error.response?.data?.error || 'Failed to process MRI. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleDownloadReport = () => {
    if (results?.pdf_download_url) {
      const link = document.createElement('a');
      // Remove trailing slash if present
      const downloadUrl = results.pdf_download_url.endsWith('/') 
        ? results.pdf_download_url.slice(0, -1) 
        : results.pdf_download_url;
      link.href = `http://localhost:8000${downloadUrl}`;
      link.download = `MRI_Report_${patientData.first_name}_${patientData.last_name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const fileTypes = [
    { key: 'flair', name: 'FLAIR', description: 'Fluid-Attenuated Inversion Recovery sequence' },
    { key: 't1ce', name: 'T1CE', description: 'T1-weighted with contrast enhancement' },
    { key: 't2', name: 'T2', description: 'T2-weighted sequence' },
    { key: 'mask', name: 'Mask', description: 'Ground truth segmentation mask' }
  ];

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
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  MRI Brain Tumor Analysis
                </h1>
                <p className="text-sm text-gray-500">
                  Upload MRI sequences for AI-powered tumor segmentation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 py-8">
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
                  Upload MRI Sequences
                </CardTitle>
                <CardDescription>
                  Upload all 4 required MRI sequences for analysis
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Patient Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={patientData.first_name}
                        onChange={(e) => handlePatientDataChange('first_name', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={patientData.last_name}
                        onChange={(e) => handlePatientDataChange('last_name', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={patientData.age}
                      onChange={(e) => handlePatientDataChange('age', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* File Upload Areas */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">MRI Sequences</h3>
                  {fileTypes.map((fileType) => (
                    <div key={fileType.key} className="space-y-2">
                      <Label htmlFor={fileType.key} className="text-sm font-medium">
                        {fileType.name} Sequence *
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-purple-400 transition-colors">
                        <input
                          id={fileType.key}
                          type="file"
                          onChange={(e) => handleFileChange(fileType.key, e)}
                          className="hidden"
                          accept=".nii,.nii.gz"
                          disabled={isProcessing}
                        />
                        <label htmlFor={fileType.key} className="cursor-pointer">
                          <div className="text-center">
                            <FileImage className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-1">
                              {files[fileType.key] ? files[fileType.key].name : 'Click to upload'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {fileType.description}
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Processing Progress */}
                {isProcessing && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Processing Progress</span>
                        <span className="text-gray-900">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
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
                  onClick={handleProcessMRI}
                  disabled={isProcessing || Object.values(files).some(file => !file)}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing MRI...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Process MRI Analysis
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
                  Analysis Results
                </CardTitle>
                <CardDescription>
                  Your MRI analysis results will appear here
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {!results ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Analysis Yet
                    </h3>
                    <p className="text-gray-600">
                      Upload MRI sequences and process them to see your analysis results
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Visualization */}
                    {results.visualization && (
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900 mb-2">Tumor Segmentation</h4>
                        <img 
                          src={`data:image/png;base64,${results.visualization}`}
                          alt="MRI Analysis Results"
                          className="w-full h-auto rounded-lg border"
                        />
                      </div>
                    )}

                    {/* Analysis Text */}
                    {results.analysis_text && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Analysis Report</h4>
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-auto max-h-40">
                          {results.analysis_text}
                        </pre>
                      </div>
                    )}

                    {/* Download Button */}
                    <Button
                      onClick={handleDownloadReport}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF Report
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MRIProcessing;
