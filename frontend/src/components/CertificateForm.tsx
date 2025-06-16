import React, { useState } from 'react';
import {
  Card, CardContent, TextField, Button, Typography,
  Alert, CircularProgress, Box
} from '@mui/material';
import { web3Service } from '../services/web3Service';

interface CertificateFormProps {
  walletAddress: string;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ walletAddress }) => {
  const [formData, setFormData] = useState({
    studentAddress: '',
    studentName: '',
    studentId: '',
    degree: '',
    major: '',
    university: 'Đại học Bách Khoa Hà Nội',
    gpa: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await web3Service.issueCertificate({
        ...formData,
        studentAddress: formData.studentAddress || walletAddress
      });
      
      setResult(response);
      
      if (response.success) {
        setFormData({
          studentAddress: '',
          studentName: '',
          studentId: '',
          degree: '',
          major: '',
          university: 'Đại học Bách Khoa Hà Nội',
          gpa: ''
        });
      }
    } catch (err: any) {
      setResult({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          🎓 Cấp chứng chỉ mới
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                sx={{ flex: 1, minWidth: 250 }}
                label="Địa chỉ ví sinh viên"
                value={formData.studentAddress}
                onChange={handleInputChange('studentAddress')}
                placeholder="0x... (để trống = ví hiện tại)"
              />
              
              <TextField
                sx={{ flex: 1, minWidth: 250 }}
                label="Tên sinh viên"
                value={formData.studentName}
                onChange={handleInputChange('studentName')}
                required
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                sx={{ flex: 1, minWidth: 250 }}
                label="Mã sinh viên"
                value={formData.studentId}
                onChange={handleInputChange('studentId')}
                required
              />
              
              <TextField
                sx={{ flex: 1, minWidth: 250 }}
                label="Ngành học"
                value={formData.degree}
                onChange={handleInputChange('degree')}
                required
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                sx={{ flex: 1, minWidth: 250 }}
                label="Chuyên ngành"
                value={formData.major}
                onChange={handleInputChange('major')}
                required
              />
              
              <TextField
                sx={{ flex: 1, minWidth: 250 }}
                label="Trường đại học"
                value={formData.university}
                onChange={handleInputChange('university')}
                required
              />
            </Box>
            
            <TextField
              fullWidth
              label="Điểm GPA"
              value={formData.gpa}
              onChange={handleInputChange('gpa')}
              required
              type="number"
              inputProps={{ min: 0, max: 4, step: 0.1 }}
            />
          </Box>

          {result && (
            <Alert 
              severity={result.success ? "success" : "error"} 
              sx={{ mt: 2 }}
            >
              {result.success 
                ? `Thành công! Token ID: ${result.tokenId}, TX: ${result.txHash?.slice(0, 10)}...`
                : `Lỗi: ${result.error}`
              }
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Cấp chứng chỉ'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CertificateForm;