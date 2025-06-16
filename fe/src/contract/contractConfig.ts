export const CONTRACT_CONFIG = {
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
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
      "function universityApproved(string) view returns (bool)",
      "function hasRole(bytes32,address) view returns (bool)",
      "function ISSUER_ROLE() view returns (bytes32)",
      "function revokeCertificate(uint256,string) returns (bool)"
    ],
    network: {
      chainId: 31337,
      name: "Hardhat Local",
      rpcUrl: "http://127.0.0.1:8545"
    }
  };