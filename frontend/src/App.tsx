import React, { useState } from 'react';
import {
  Container, Box, Typography, ThemeProvider, createTheme, CssBaseline,
  AppBar, Toolbar, Tabs, Tab
} from '@mui/material';
import WalletConnect from './components/WalletConnect';
import CertificateForm from './components/CertificateForm';
import CertificateVerify from './components/CertificateVerify';
import CertificateList from './components/CertificateList';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [currentTab, setCurrentTab] = useState(0);

  const handleWalletConnected = (address: string) => {
    setWalletAddress(address);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🎓 Hệ thống chứng chỉ Blockchain
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <WalletConnect onWalletConnected={handleWalletConnected} />
        
        {walletAddress && (
          <Box>
            <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="📊 Thống kê" />
              <Tab label="➕ Cấp chứng chỉ" />
              <Tab label="🔍 Xác minh" />
            </Tabs>
            
            {currentTab === 0 && <CertificateList />}
            {currentTab === 1 && <CertificateForm walletAddress={walletAddress} />}
            {currentTab === 2 && <CertificateVerify />}
          </Box>
        )}
        
        {!walletAddress && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="textSecondary">
              Vui lòng kết nối ví MetaMask để sử dụng hệ thống
            </Typography>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;