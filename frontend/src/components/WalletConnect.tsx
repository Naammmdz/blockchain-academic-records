import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Alert, Box } from '@mui/material';
import { AccountBalanceWallet, CheckCircle, Warning, Security } from '@mui/icons-material';
import { web3Service } from '../services/web3Service';

interface WalletConnectProps {
  onWalletConnected: (address: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onWalletConnected }) => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [hasIssuerRole, setHasIssuerRole] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    setLoading(true);
    setError('');
    
    try {
      const walletAddress = await web3Service.connectWallet();
      const walletBalance = await web3Service.getBalance(walletAddress);
      const issuerRole = await web3Service.checkIssuerRole();
      
      setAddress(walletAddress);
      setBalance(parseFloat(walletBalance).toFixed(4));
      setHasIssuerRole(issuerRole);
      setConnected(true);
      onWalletConnected(walletAddress);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (connected) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <CheckCircle color="success" />
            <Box>
              <Typography variant="h6" color="success.main">
                Ví đã kết nối
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {address.slice(0, 10)}...{address.slice(-8)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Số dư: {balance} ETH
              </Typography>
            </Box>
          </Box>
          
          {hasIssuerRole ? (
            <Alert severity="success" icon={<Security />}>
              ✅ Tài khoản có quyền cấp chứng chỉ (ISSUER_ROLE)
            </Alert>
          ) : (
            <Alert severity="warning" icon={<Warning />}>
              ⚠️ Tài khoản không có quyền cấp chứng chỉ. 
              <br />
              <strong>Giải pháp:</strong>
              <br />
              1. Sử dụng tài khoản deployer: 0xf39F...2266
              <br />
              2. Hoặc grant ISSUER_ROLE cho tài khoản này
            </Alert>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Kết nối ví MetaMask
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Button
          variant="contained"
          onClick={connectWallet}
          disabled={loading}
          startIcon={<AccountBalanceWallet />}
          size="large"
        >
          {loading ? 'Đang kết nối...' : 'Kết nối MetaMask'}
        </Button>
        
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          💡 Tip: Sử dụng tài khoản đầu tiên (deployer) để có quyền cấp chứng chỉ
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WalletConnect;