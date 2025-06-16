const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const userAddress = "0xbD2dEac941F66CAB30108119550d8Eb9C0b17d8D";
  
  const AcademicCertificate = await hre.ethers.getContractFactory("AcademicCertificate");
  const contract = AcademicCertificate.attach(contractAddress);
  
  const ISSUER_ROLE = await contract.ISSUER_ROLE();
  console.log("🔑 ISSUER_ROLE:", ISSUER_ROLE);
  
  console.log("🔄 Granting ISSUER role to:", userAddress);
  const tx = await contract.grantRole(ISSUER_ROLE, userAddress);
  await tx.wait();
  
  console.log("✅ ISSUER role granted successfully!");
  
  // Verify
  const hasRole = await contract.hasRole(ISSUER_ROLE, userAddress);
  console.log("✅ Verification - Has role:", hasRole);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});