import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Box, Button
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { web3Service } from '../services/web3Service';

const CertificateList: React.FC = () => {
  const [stats, setStats] = useState({
    total: 0,
    valid: 0
  });
  const [loading, setLoading] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    try {
      const total = await web3Service.getTotalCertificates();
      const valid = await web3Service.getValidCertificatesCount();
      setStats({ total, valid });
    } catch (error) {
      console.error('Lỗi tải thống kê:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">
            📊 Thống kê chứng chỉ
          </Typography>
          <Button onClick={loadStats} disabled={loading} startIcon={<Refresh />}>
            Làm mới
          </Button>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ 
            flex: 1, 
            minWidth: 200,
            textAlign: 'center', 
            p: 2, 
            bgcolor: 'primary.light', 
            borderRadius: 1,
            color: 'white'
          }}>
            <Typography variant="h3">
              {stats.total}
            </Typography>
            <Typography variant="body1">
              Tổng chứng chỉ
            </Typography>
          </Box>
          
          <Box sx={{ 
            flex: 1, 
            minWidth: 200,
            textAlign: 'center', 
            p: 2, 
            bgcolor: 'success.light', 
            borderRadius: 1,
            color: 'white'
          }}>
            <Typography variant="h3">
              {stats.valid}
            </Typography>
            <Typography variant="body1">
              Chứng chỉ hợp lệ
            </Typography>
          </Box>
          
          <Box sx={{ 
            flex: 1, 
            minWidth: 200,
            textAlign: 'center', 
            p: 2, 
            bgcolor: 'warning.light', 
            borderRadius: 1,
            color: 'white'
          }}>
            <Typography variant="h3">
              {stats.total - stats.valid}
            </Typography>
            <Typography variant="body1">
              Đã thu hồi
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CertificateList;