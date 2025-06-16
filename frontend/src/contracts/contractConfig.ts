export const CONTRACT_CONFIG = {
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Direct address, no ENS
  abi: [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function issueCertificate(address,string,string,string,string,string,uint256,string,string) returns (uint256)",
    "function getCertificate(uint256) view returns (tuple(string,string,string,string,string,uint256,string,bool,uint256,address,string,string))",
    "function verifyCertificate(uint256) view returns (bool)",
    "function getCertificateByStudentId(string) view returns (tuple(string,string,string,string,string,uint256,string,bool,uint256,address,string,string))",
    "function getStudentCertificates(address) view returns (uint256[])",
    "function getTotalCertificates() view returns (uint256)",
    "function getValidCertificatesCount() view returns (uint256)",
    "function revokeCertificate(uint256,string) returns (bool)",
    "function hasRole(bytes32,address) view returns (bool)",
    "function ISSUER_ROLE() view returns (bytes32)"
  ],
  network: {
    chainId: 31337,
    name: "Hardhat Local", // Clear network name
    rpcUrl: "http://127.0.0.1:8545",
    ensRegistry: null // Explicitly disable ENS
  }
};

// Network validation helper
export const isValidAddress = (address: string): boolean => {
  try {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  } catch {
    return false;
  }
};

// Log configuration for debugging
console.log('📋 Contract Config:', {
  address: CONTRACT_CONFIG.address,
  chainId: CONTRACT_CONFIG.network.chainId,
  networkName: CONTRACT_CONFIG.network.name
});