import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../../components/ui/button';
import { 
  Stethoscope, 
  Brain, 
  X, 
  Heart, 
  Eye, 
  Activity,
  ArrowRight,
  Upload,
  Download,
  FileText,
  Bot,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

function Services() {
  const navigate = useNavigate();

  const handleDoctorAssistance = () => {
    navigate('/user/testchat');
  };

  const handleModelProcessing = (modelType) => {
    if (modelType === 'mri') {
      navigate('/user/mri-processing');
    }
    // Other models are coming soon
  };

  const aiModels = [
    {
      id: 'mri',
      name: 'MRI Model',
      description: 'Process MRI scans and generate detailed reports',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200',
      fileTypes: ['.nii', '.nii.gz', '.dcm', '.dicom']
    },
    {
      id: 'xray',
      name: 'X-Ray Model',
      description: 'Analyze X-Ray images for abnormalities',
      icon: X,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      fileTypes: ['.dcm', '.dicom', '.jpg', '.png']
    },
    {
      id: 'ecg',
      name: 'ECG Model',
      description: 'Process ECG readings and detect heart conditions',
      icon: Heart,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      fileTypes: ['.xml', '.txt', '.csv', '.json']
    },
    {
      id: 'ct',
      name: 'CT Scan Model',
      description: 'Analyze CT scans for detailed medical insights',
      icon: Eye,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
      fileTypes: ['.dcm', '.dicom', '.nii', '.nii.gz']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <section id='services' className='py-20'>
        <div className='container mx-auto px-4'>
          {/* Header */}
          <div className='text-center mb-16'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='flex flex-row gap-2 justify-center items-center mb-4'
            >
              <h2 className='text-blue-600 font-bold text-4xl font-rocky'>Our</h2>
              <h2 className='text-black font-bold text-4xl font-rocky border-b-2 border-b-blue-600'>Services</h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='text-gray-600 text-lg max-w-2xl mx-auto'
            >
              Choose from our comprehensive AI-powered medical services. Get instant analysis or chat with our AI doctor.
            </motion.p>
          </div>

          {/* Main Service Cards */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'>
            {/* Doctor Assistance Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className='group'
            >
              <Card className='h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-300 cursor-pointer bg-gradient-to-br from-blue-500 to-purple-600 text-white'>
                <CardHeader className='text-center pb-4'>
                  <div className='w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
                    <Stethoscope className='w-10 h-10 text-white' />
                  </div>
                  <CardTitle className='text-2xl font-bold mb-2'>AI Doctor Assistance</CardTitle>
                  <CardDescription className='text-blue-100 text-lg'>
                    Chat with our AI doctor about your medical reports and get instant insights
                  </CardDescription>
                </CardHeader>
                
                <CardContent className='text-center'>
                  <div className='space-y-4 mb-6'>
                    <div className='flex items-center gap-3 text-blue-100'>
                      <Bot className='w-5 h-5' />
                      <span>24/7 AI Doctor Available</span>
                    </div>
                    <div className='flex items-center gap-3 text-blue-100'>
                      <FileText className='w-5 h-5' />
                      <span>Upload Any Medical Report</span>
                    </div>
                    <div className='flex items-center gap-3 text-blue-100'>
                      <Zap className='w-5 h-5' />
                      <span>Instant Analysis & Recommendations</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleDoctorAssistance}
                    className='w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 group-hover:scale-105 transition-transform duration-300'
                  >
                    Start Chat with AI Doctor
                    <ArrowRight className='w-4 h-4 ml-2' />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Models Processing Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className='group'
            >
              <Card className='h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-300 cursor-pointer bg-gradient-to-br from-purple-500 to-pink-600 text-white'>
                <CardHeader className='text-center pb-4'>
                  <div className='w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
                    <Brain className='w-10 h-10 text-white' />
                  </div>
                  <CardTitle className='text-2xl font-bold mb-2'>AI Model Processing</CardTitle>
                  <CardDescription className='text-purple-100 text-lg'>
                    Upload raw medical files and get AI-generated detailed reports
                  </CardDescription>
                </CardHeader>
                
                <CardContent className='text-center'>
                  <div className='space-y-4 mb-6'>
                    <div className='flex items-center gap-3 text-purple-100'>
                      <Upload className='w-5 h-5' />
                      <span>Upload Raw Medical Files</span>
                    </div>
                    <div className='flex items-center gap-3 text-purple-100'>
                      <Activity className='w-5 h-5' />
                      <span>AI Processing & Analysis</span>
                    </div>
                    <div className='flex items-center gap-3 text-purple-100'>
                      <Download className='w-5 h-5' />
                      <span>Download PDF Report</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => navigate('/user/mri-processing')}
                    className='w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold py-3 group-hover:scale-105 transition-transform duration-300'
                  >
                    Process with AI Models
                    <ArrowRight className='w-4 h-4 ml-2' />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* AI Models Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className='text-2xl font-bold text-center mb-8 text-gray-800'>
              Available AI Models
            </h3>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {aiModels.map((model, index) => {
                const IconComponent = model.icon;
                const isAvailable = model.id === 'mri';
                return (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className='group'
                  >
                    <Card 
                      className={`h-full transition-all duration-300 border-2 ${model.bgColor} ${
                        isAvailable 
                          ? `hover:shadow-xl cursor-pointer hover:${model.borderColor} hover:scale-105` 
                          : 'opacity-60 cursor-not-allowed'
                      }`}
                      onClick={() => isAvailable && handleModelProcessing(model.id)}
                    >
                      <CardHeader className='text-center pb-2'>
                        <div className={`w-16 h-16 bg-gradient-to-br ${model.color} rounded-full flex items-center justify-center mx-auto mb-3 ${isAvailable ? 'group-hover:scale-110' : ''} transition-transform duration-300 relative`}>
                          <IconComponent className='w-8 h-8 text-white' />
                          {!isAvailable && (
                            <div className='absolute inset-0 bg-black/50 rounded-full flex items-center justify-center'>
                              <span className='text-white text-xs font-bold'>Soon</span>
                            </div>
                          )}
                        </div>
                        <CardTitle className={`text-lg font-semibold ${model.textColor}`}>
                          {model.name}
                          {!isAvailable && <span className='text-orange-500 ml-2 text-sm'>(Coming Soon)</span>}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className='text-center'>
                        <p className='text-sm text-gray-600 mb-4'>
                          {model.description}
                        </p>
                        
                        <div className='space-y-2 mb-4'>
                          <p className='text-xs font-medium text-gray-500'>Supported Formats:</p>
                          <div className='flex flex-wrap gap-1 justify-center'>
                            {model.fileTypes.map((type, idx) => (
                              <span 
                                key={idx}
                                className='text-xs bg-white px-2 py-1 rounded-full border'
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className={`w-full ${
                            isAvailable 
                              ? `${model.textColor} border-current hover:bg-gradient-to-r hover:${model.color} hover:text-white hover:border-transparent` 
                              : 'text-gray-400 border-gray-300 cursor-not-allowed'
                          }`}
                          disabled={!isAvailable}
                        >
                          {isAvailable ? 'Process Files' : 'Coming Soon'}
                          {isAvailable && <ArrowRight className='w-3 h-3 ml-1' />}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='text-center mt-16'
          >
            <Card className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8'>
              <h3 className='text-2xl font-bold mb-4'>Ready to Get Started?</h3>
              <p className='text-blue-100 mb-6 max-w-2xl mx-auto'>
                Choose your preferred service and experience the power of AI in medical diagnosis and analysis.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Button
                  onClick={handleDoctorAssistance}
                  className='bg-white text-blue-600 font-semibold px-8 py-3'
                >
                  Start AI Chat
                </Button>
                <Button
                  onClick={() => navigate('/user/mri-processing')}
                  variant="outline"
                  className=' bg-white text-blue-600 font-semibold px-8 py-3'
                >
                  Process Files
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Services;
