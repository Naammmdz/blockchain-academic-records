import { ethers } from 'ethers';
import { CONTRACT_CONFIG } from '../contracts/contractConfig';

interface Certificate {
  studentName: string;
  studentId: string;
  degree: string;
  major: string;
  university: string;
  issuedAt: number;
  ipfsHash: string;
  isValid: boolean;
  graduationDate: number;
  issuer: string;
  gpa: string;
  revokeReason: string;
}

class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;
  private contract: ethers.Contract | null = null;
  private userAddress: string = '';

  async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask chưa được cài đặt');
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      this.provider = new ethers.BrowserProvider(window.ethereum, {
        chainId: CONTRACT_CONFIG.network.chainId,
        name: CONTRACT_CONFIG.network.name,
        ensAddress: undefined
      });
      
      this.signer = await this.provider.getSigner();
      this.userAddress = await this.signer.getAddress();
      
      await this.switchToLocalNetwork();
      
      this.contract = new ethers.Contract(
        CONTRACT_CONFIG.address,
        CONTRACT_CONFIG.abi,
        this.signer
      );

      // Check if user has ISSUER role
      const hasIssuerRole = await this.checkIssuerRole();
      console.log('✅ Wallet connected:', this.userAddress);
      console.log('🔐 Has ISSUER role:', hasIssuerRole);
      
      if (!hasIssuerRole) {
        console.warn('⚠️ Warning: Connected wallet does not have ISSUER role');
      }

      return this.userAddress;
    } catch (error: any) {
      console.error('❌ Connection error:', error);
      throw new Error(`Lỗi kết nối: ${error.message}`);
    }
  }

  async checkIssuerRole(): Promise<boolean> {
    if (!this.contract || !this.userAddress) return false;
    
    try {
      const ISSUER_ROLE = await this.contract.ISSUER_ROLE();
      const hasRole = await this.contract.hasRole(ISSUER_ROLE, this.userAddress);
      return hasRole;
    } catch (error) {
      console.error('❌ Role check error:', error);
      return false;
    }
  }

  async switchToDeployerAccount(): Promise<string> {
    // This is for testing - switch to first account (deployer)
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      // Request to switch to first account (deployer)
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }]
      });
      
      // Reconnect with potentially different account
      return await this.connectWallet();
    } catch (error: any) {
      throw new Error(`Cannot switch account: ${error.message}`);
    }
  }

  private async switchToLocalNetwork() {
    try {
      const chainIdHex = `0x${CONTRACT_CONFIG.network.chainId.toString(16)}`;
      
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
      
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${CONTRACT_CONFIG.network.chainId.toString(16)}`,
            chainName: CONTRACT_CONFIG.network.name,
            rpcUrls: [CONTRACT_CONFIG.network.rpcUrl],
            nativeCurrency: { 
              name: 'ETH', 
              symbol: 'ETH', 
              decimals: 18 
            }
          }]
        });
      }
    }
  }

  async issueCertificate(data: {
    studentAddress: string;
    studentName: string;
    studentId: string;
    degree: string;
    major: string;
    university: string;
    gpa: string;
  }) {
    if (!this.contract) throw new Error('Contract chưa được khởi tạo');

    try {
      // Check issuer role first
      const hasRole = await this.checkIssuerRole();
      if (!hasRole) {
        throw new Error('Tài khoản hiện tại không có quyền cấp chứng chỉ. Vui lòng sử dụng tài khoản deployer hoặc được cấp quyền ISSUER_ROLE.');
      }

      console.log('🔄 Issuing certificate...', data);
      
      let studentAddr = data.studentAddress;
      if (!studentAddr || !ethers.isAddress(studentAddr)) {
        studentAddr = this.userAddress;
      }

      const tx = await this.contract.issueCertificate(
        studentAddr,
        data.studentName,
        data.studentId,
        data.degree,
        data.major,
        data.university,
        Math.floor(Date.now() / 1000),
        `QmHash${Date.now()}`,
        data.gpa
      );

      console.log('⏳ Transaction sent:', tx.hash);
      const receipt = await tx.wait();
      console.log('✅ Transaction confirmed:', receipt.hash);
      
      let tokenId = 0;
      try {
        const transferTopic = ethers.id("Transfer(address,address,uint256)");
        const transferLog = receipt.logs.find((log: any) => 
          log.topics && log.topics[0] === transferTopic
        );
        
        if (transferLog && transferLog.topics && transferLog.topics[3]) {
          tokenId = parseInt(transferLog.topics[3], 16);
        }
      } catch (eventError) {
        console.log('⚠️ Could not extract token ID from events');
      }

      return { success: true, txHash: receipt.hash, tokenId };
    } catch (error: any) {
      console.error('❌ Certificate issuance error:', error);
      
      // Provide specific error message for role issue
      if (error.message.includes('not an issuer')) {
        return { 
          success: false, 
          error: 'Tài khoản không có quyền cấp chứng chỉ. Vui lòng sử dụng tài khoản deployer (0xf39F...) hoặc được cấp quyền ISSUER_ROLE.' 
        };
      }
      
      return { success: false, error: error.message || 'Transaction failed' };
    }
  }

  // ... rest of the methods remain the same
  async getCertificate(tokenId: number): Promise<Certificate | null> {
    if (!this.contract) return null;

    try {
      const cert = await this.contract.getCertificate(tokenId);
      return {
        studentName: cert[0],
        studentId: cert[1],
        degree: cert[2],
        major: cert[3],
        university: cert[4],
        issuedAt: Number(cert[5]),
        ipfsHash: cert[6],
        isValid: cert[7],
        graduationDate: Number(cert[8]),
        issuer: cert[9],
        gpa: cert[10],
        revokeReason: cert[11]
      };
    } catch (error) {
      return null;
    }
  }

  async verifyCertificate(tokenId: number): Promise<boolean> {
    if (!this.contract) return false;
    try {
      return await this.contract.verifyCertificate(tokenId);
    } catch (error) {
      return false;
    }
  }

  async getCertificateByStudentId(studentId: string): Promise<Certificate | null> {
    if (!this.contract) return null;
    try {
      const cert = await this.contract.getCertificateByStudentId(studentId);
      return {
        studentName: cert[0],
        studentId: cert[1],
        degree: cert[2],
        major: cert[3],
        university: cert[4],
        issuedAt: Number(cert[5]),
        ipfsHash: cert[6],
        isValid: cert[7],
        graduationDate: Number(cert[8]),
        issuer: cert[9],
        gpa: cert[10],
        revokeReason: cert[11]
      };
    } catch (error) {
      return null;
    }
  }

  async getTotalCertificates(): Promise<number> {
    if (!this.contract) return 0;
    try {
      const total = await this.contract.getTotalCertificates();
      return Number(total);
    } catch (error) {
      return 0;
    }
  }

  async getValidCertificatesCount(): Promise<number> {
    if (!this.contract) return 0;
    try {
      const count = await this.contract.getValidCertificatesCount();
      return Number(count);
    } catch (error) {
      return 0;
    }
  }

  async getBalance(address: string): Promise<string> {
    if (!this.provider) return '0';
    try {
      if (!ethers.isAddress(address)) return '0';
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      return '0';
    }
  }
}

export const web3Service = new Web3Service();

declare global {
  interface Window {
    ethereum?: any;
  }
}