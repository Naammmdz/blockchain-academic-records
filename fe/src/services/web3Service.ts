import { ethers } from 'ethers';
import { CONTRACT_CONFIG } from '../contract/contractConfig';

export interface Certificate {
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

export class Web3Service {
  private provider: ethers.providers.Web3Provider | null = null;
  private signer: ethers.Signer | null = null;
  private contract: ethers.Contract | null = null;

  async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask chưa được cài đặt!');
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = await this.provider.getSigner();
      
      await this.switchToLocalNetwork();
      
      this.contract = new ethers.Contract(
        CONTRACT_CONFIG.address,
        CONTRACT_CONFIG.abi,
        this.signer
      );

      return await this.signer.getAddress();
    } catch (error) {
      console.error('Lỗi kết nối wallet:', error);
      throw error;
    }
  }

  private async switchToLocalNetwork() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${CONTRACT_CONFIG.network.chainId.toString(16)}` }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${CONTRACT_CONFIG.network.chainId.toString(16)}`,
            chainName: CONTRACT_CONFIG.network.name,
            rpcUrls: [CONTRACT_CONFIG.network.rpcUrl],
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }
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
  }): Promise<{ success: boolean; txHash?: string; tokenId?: number; error?: string }> {
    if (!this.contract) throw new Error('Contract chưa được khởi tạo');

    try {
      const tx = await this.contract.issueCertificate(
        data.studentAddress,
        data.studentName,
        data.studentId,
        data.degree,
        data.major,
        data.university,
        Math.floor(Date.now() / 1000),
        `QmHash${Date.now()}`,
        data.gpa
      );

      const receipt = await tx.wait();
      
      // Lấy tokenId từ events
      const event = receipt.logs.find((log: any) => 
        log.topics[0] === ethers.utils.id("Transfer(address,address,uint256)")
      );
      
      let tokenId = 0;
      if (event) {
        tokenId = parseInt(event.topics[3], 16);
      }

      return {
        success: true,
        txHash: receipt.hash,
        tokenId
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Lỗi khi cấp chứng chỉ'
      };
    }
  }

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
      console.error('Lỗi lấy thông tin chứng chỉ:', error);
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

  async getStudentCertificates(address: string): Promise<number[]> {
    if (!this.contract) return [];
    try {
      const certificates = await this.contract.getStudentCertificates(address);
      return certificates.map((cert: any) => Number(cert));
    } catch (error) {
      return [];
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

  async revokeCertificate(tokenId: number, reason: string): Promise<boolean> {
    if (!this.contract) return false;
    try {
      const tx = await this.contract.revokeCertificate(tokenId, reason);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Lỗi thu hồi chứng chỉ:', error);
      return false;
    }
  }

  async checkIssuerRole(address: string): Promise<boolean> {
    if (!this.contract) return false;
    try {
      const ISSUER_ROLE = await this.contract.ISSUER_ROLE();
      return await this.contract.hasRole(ISSUER_ROLE, address);
    } catch (error) {
      return false;
    }
  }

  getContract() {
    return this.contract;
  }

  getSigner() {
    return this.signer;
  }

  async getBalance(address: string): Promise<string> {
    if (!this.provider) return '0';
    try {
      const balance = await this.provider.getBalance(address);
      return ethers.utils.formatEther(balance);
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