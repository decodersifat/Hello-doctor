# MRI Processing Integration Guide

## Overview
The Django backend now provides comprehensive MRI brain tumor analysis capabilities that integrate with the frontend React application. The system processes 4 MRI sequences and generates detailed PDF reports with AI-powered tumor segmentation.

## Django Backend Features

### 1. MRI Processing Pipeline
- **Input**: 4 NIfTI files (FLAIR, T1CE, T2, Mask)
- **AI Model**: Uses trained Keras model (`model-V2-diceLoss_focal.keras`)
- **Processing**: Brain tumor segmentation and volume analysis
- **Output**: PDF report with visualizations and quantitative analysis

### 2. API Endpoints

#### Web Interface
- `GET /api/mri-input/` - MRI upload form
- `POST /api/predict/` - Process MRI files (web form)
- `GET /api/download_pdf/<filename>/` - Download PDF report

#### REST API
- `POST /api/mri-process/` - REST API for MRI processing
  - Accepts multipart form data with 4 files
  - Returns JSON with analysis results and PDF download link

### 3. Key Functions

#### `preprocessing(flair_file, t1ce_file, t2_file, mask_file)`
- Loads and preprocesses 4 MRI sequences
- Applies MinMaxScaler normalization
- Resizes to 128x128x128 voxels
- Combines sequences into 4-channel input

#### `predict(request)`
- Main processing function
- Loads AI model and runs inference
- Generates tumor segmentation mask
- Creates PDF report with visualizations

#### `calculate(final_mask)`
- Calculates tumor volumes and percentages
- Analyzes different tumor regions:
  - Necrotic and Non-enhancing tumor core (NCR/NET)
  - Peritumoral edema (ED)
  - Enhancing tumor (ET)
- Returns formatted analysis text

#### `generate_pdf(output_filename, analysis_output, first_name, last_name, age, img, test_prediction_argmax)`
- Creates comprehensive PDF report
- Includes patient information
- Shows tumor volume analysis
- Displays visual slices with segmentation overlay

## Frontend Integration

### 1. New MRI Processing Page
- **Route**: `/user/mri-processing`
- **Component**: `MRIProcessing.jsx`
- **Features**:
  - Upload interface for 4 MRI sequences
  - Patient information form
  - Real-time processing progress
  - Results visualization
  - PDF download functionality

### 2. File Upload Requirements
- **FLAIR**: Fluid-Attenuated Inversion Recovery sequence
- **T1CE**: T1-weighted with contrast enhancement
- **T2**: T2-weighted sequence
- **Mask**: Ground truth segmentation mask
- **Format**: NIfTI (.nii or .nii.gz)
- **Size Limit**: 500MB per file

### 3. API Integration
```javascript
const formData = new FormData();
formData.append('files', files.flair);
formData.append('files', files.t1ce);
formData.append('files', files.t2);
formData.append('files', files.mask);
formData.append('patient_data', JSON.stringify(patientData));

const response = await axios.post('http://localhost:8000/api/mri-process/', formData);
```

## Setup Instructions

### 1. Django Backend Setup
```bash
cd backend/django
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### 2. Model File Placement
- Place the trained model file at: `backend/django/model/model-V2-diceLoss_focal.keras`
- Update the model path in `views.py` if needed

### 3. Media Directory
- Create `backend/django/media/reports/` directory
- This is where PDF reports will be stored

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "MRI analysis completed successfully",
  "data": {
    "analysis_text": "Detailed tumor volume analysis...",
    "visualization": "base64_encoded_image",
    "pdf_download_url": "/api/download_pdf/MRI_Report_20241201_143022.pdf",
    "patient_name": "John Doe",
    "age": 45,
    "processed_at": "2024-12-01T14:30:22.123456"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Please upload exactly 4 files: FLAIR, T1CE, T2, and Mask"
}
```

## Tumor Analysis Output

The system provides detailed analysis including:

1. **Voxel Dimensions**: Physical size of each voxel
2. **Tumor Volumes**: Volume in mm³ for each tumor region
3. **Percentage Breakdown**: Relative percentage of each tumor component
4. **Total Tumor Volume**: Combined volume excluding background
5. **Visual Slices**: Multiple MRI slices showing segmentation overlay

## Security Considerations

1. **File Validation**: Only NIfTI files are accepted
2. **Size Limits**: 500MB maximum per file
3. **CSRF Protection**: Disabled for API endpoints (consider enabling for production)
4. **Authentication**: Integrate with user authentication system

## Production Deployment

1. **Model Path**: Update hardcoded model path
2. **Logo Path**: Update logo path in PDF generation
3. **Error Handling**: Add comprehensive error handling
4. **Logging**: Implement proper logging
5. **Security**: Enable CSRF protection and input validation
6. **Performance**: Consider async processing for large files

## Testing

Use the provided test scripts:
- `test-chat-api.js` - Tests chat functionality
- `test-profile-chats.js` - Tests profile and chat integration

For MRI processing, test with sample NIfTI files through the web interface or API.

## Troubleshooting

1. **Model Not Found**: Ensure model file is in correct location
2. **Memory Issues**: Large files may require more RAM
3. **File Format**: Ensure files are valid NIfTI format
4. **Dependencies**: Install all required Python packages
5. **CORS**: Configure CORS for frontend-backend communication
