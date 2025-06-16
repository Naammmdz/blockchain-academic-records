import { ethers } from "hardhat";

async function main() {
    console.log("🚀 Deploying AcademicCertificate contract...");
    
    const [deployer] = await ethers.getSigners();
    console.log("📝 Deploying with account:", deployer.address);
    
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("💰 Account balance:", ethers.formatEther(balance), "ETH");
    
    // Deploy contract
    const AcademicCertificate = await ethers.getContractFactory("AcademicCertificate");
    const contract = await AcademicCertificate.deploy();
    
    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();
    
    console.log("✅ AcademicCertificate deployed to:", contractAddress);
    
    // Setup initial configuration
    console.log("⚙️ Setting up initial configuration...");
    
    // Approve a test university
    const approveUniversityTx = await contract.approveUniversity("Đại học Bách Khoa Hà Nội");
    await approveUniversityTx.wait();
    console.log("🏫 University approved: Đại học Bách Khoa Hà Nội");
    
    // Grant roles
    const ISSUER_ROLE = await contract.ISSUER_ROLE();
    const grantRoleTx = await contract.grantRole(ISSUER_ROLE, deployer.address);
    await grantRoleTx.wait();
    console.log("👤 Issuer role granted to deployer");
    
    console.log("\n📊 DEPLOYMENT SUMMARY:");
    console.log("Contract Address:", contractAddress);
    console.log("Deployer:", deployer.address);
    console.log("Network:", (await ethers.provider.getNetwork()).name);
    
    console.log(`\n🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!`);
    console.log(`📋 Contract Address: ${contractAddress}`);
    console.log(`🔧 Ready for certificate issuance!`);
}

main().catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exitCode = 1;
});