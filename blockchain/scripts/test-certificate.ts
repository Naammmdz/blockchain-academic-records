import { ethers } from "hardhat";

async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const [deployer, student] = await ethers.getSigners();
    
    console.log("🔧 Testing AcademicCertificate functionality...");
    console.log("📍 Contract Address:", contractAddress);
    
    // Connect to deployed contract
    const AcademicCertificate = await ethers.getContractFactory("AcademicCertificate");
    const contract = AcademicCertificate.attach(contractAddress);
    
    console.log("👤 Deployer:", deployer.address);
    console.log("🎓 Student:", student.address);
    
    // Issue a test certificate
    console.log("\n📜 Issuing test certificate...");
    const tx = await contract.issueCertificate(
        student.address,
        "Nguyen Van A",
        "SV20241001",
        "Computer Science",
        "Software Engineering", 
        "Đại học Bách Khoa Hà Nội",
        Math.floor(Date.now() / 1000),
        "QmTestHash123456789",
        "3.75"
    );
    
    const receipt = await tx.wait();
    console.log("✅ Certificate issued! Transaction:", receipt?.hash);
    
    // Get certificate details
    const certificate = await contract.getCertificate(1);
    console.log("\n📋 Certificate Details:");
    console.log("Student Name:", certificate.studentName);
    console.log("Student ID:", certificate.studentId);
    console.log("Degree:", certificate.degree);
    console.log("Major:", certificate.major);
    console.log("University:", certificate.university);
    console.log("GPA:", certificate.gpa);
    console.log("Valid:", certificate.isValid);
    console.log("Issued At:", new Date(Number(certificate.issuedAt) * 1000).toLocaleString());
    
    // Verify certificate
    const isValid = await contract.verifyCertificate(1);
    console.log("\n✅ Certificate Verification:", isValid ? "VALID" : "INVALID");
    
    // Get total certificates
    const total = await contract.getTotalCertificates();
    console.log("📊 Total Certificates:", total.toString());
    
    // Test getting certificate by student ID
    console.log("\n🔍 Testing lookup by Student ID...");
    const certificateByStudentId = await contract.getCertificateByStudentId("SV20241001");
    console.log("Found certificate for SV20241001:", certificateByStudentId.studentName);
    
    // Get student certificates
    const studentCertificates = await contract.getStudentCertificates(student.address);
    console.log("📜 Student certificates count:", studentCertificates.length);
    
    console.log("\n🎉 ALL TESTS COMPLETED SUCCESSFULLY!");
}

main().catch((error) => {
    console.error("❌ Test failed:", error);
    process.exitCode = 1;
});