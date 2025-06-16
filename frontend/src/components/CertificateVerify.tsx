import React, { useState } from 'react';
import {
  Card, CardContent, TextField, Button, Typography,
  Box, Chip, Divider
} from '@mui/material';
import { Search, CheckCircle, Cancel } from '@mui/icons-material';
import { web3Service } from '../services/web3Service';

const CertificateVerify: React.FC = () => {
  const [tokenId, setTokenId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const verifyByTokenId = async () => {
    if (!tokenId) return;
    setLoading(true);
    
    try {
      const certificate = await web3Service.getCertificate(parseInt(tokenId));
      const isValid = await web3Service.verifyCertificate(parseInt(tokenId));
      setResult({ certificate, isValid, type: 'success' });
    } catch (error) {
      setResult({ error: 'Không tìm thấy chứng chỉ', type: 'error' });
    }
    setLoading(false);
  };

  const verifyByStudentId = async () => {
    if (!studentId) return;
    setLoading(true);
    
    try {
      const certificate = await web3Service.getCertificateByStudentId(studentId);
      if (certificate) {
        setResult({ certificate, isValid: certificate.isValid, type: 'success' });
      } else {
        setResult({ error: 'Không tìm thấy chứng chỉ', type: 'error' });
      }
    } catch (error) {
      setResult({ error: 'Lỗi truy vấn', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          🔍 Xác minh chứng chỉ
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              label="Token ID"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              type="number"
            />
            <Button
              variant="contained"
              onClick={verifyByTokenId}
              disabled={loading || !tokenId}
              sx={{ minWidth: 100 }}
            >
              <Search />
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              label="Mã sinh viên"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={verifyByStudentId}
              disabled={loading || !studentId}
              sx={{ minWidth: 100 }}
            >
              <Search />
            </Button>
          </Box>
        </Box>

        {result && (
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2 }} />
            
            {result.type === 'error' ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}>
                <Cancel />
                <Typography>{result.error}</Typography>
              </Box>
            ) : (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  {result.isValid ? (
                    <>
                      <CheckCircle color="success" />
                      <Chip label="Chứng chỉ hợp lệ" color="success" />
                    </>
                  ) : (
                    <>
                      <Cancel color="error" />
                      <Chip label="Chứng chỉ không hợp lệ" color="error" />
                    </>
                  )}
                </Box>
                
                {result.certificate && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      <Typography variant="body2" sx={{ minWidth: 200 }}>
                        <strong>Sinh viên:</strong> {result.certificate.studentName}
                      </Typography>
                      <Typography variant="body2" sx={{ minWidth: 200 }}>
                        <strong>Mã SV:</strong> {result.certificate.studentId}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      <Typography variant="body2" sx={{ minWidth: 200 }}>
                        <strong>Ngành:</strong> {result.certificate.degree}
                      </Typography>
                      <Typography variant="body2" sx={{ minWidth: 200 }}>
                        <strong>Chuyên ngành:</strong> {result.certificate.major}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      <Typography variant="body2" sx={{ minWidth: 200 }}>
                        <strong>Trường:</strong> {result.certificate.university}
                      </Typography>
                      <Typography variant="body2" sx={{ minWidth: 200 }}>
                        <strong>GPA:</strong> {result.certificate.gpa}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2">
                      <strong>Ngày cấp:</strong> {new Date(result.certificate.issuedAt * 1000).toLocaleDateString('vi-VN')}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificateVerify;