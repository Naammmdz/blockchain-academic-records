const hre = require("hardhat");

async function main() {
  // ⚠️ THAY ĐỔI ADDRESS NÀY SAU KHI DEPLOY
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  console.log("🏫 Adding universities to contract:", contractAddress);
  
  const AcademicCertificate = await hre.ethers.getContractFactory("AcademicCertificate");
  const contract = AcademicCertificate.attach(contractAddress);
  
  // Danh sách các trường đại học Việt Nam
  const universities = [
    "Đại học Bách Khoa Hà Nội",
    "Đại học Quốc gia Hà Nội",
    "Đại học Quốc gia TP.HCM",
    "Đại học Bách khoa TP.HCM",
    "Đại học Kinh tế Quốc dân",
    "Đại học Ngoại thương",
    "Đại học Y Hà Nội",
    "Đại học Sư phạm Hà Nội",
    "Đại học Công nghệ - ĐHQGHN",
    "Đại học Khoa học Tự nhiên - ĐHQGHN",
    "Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN",
    "Đại học Công nghiệp Hà Nội",
    "Đại học Thương mại",
    "Đại học Xây dựng",
    "Đại học Giao thông Vận tải",
    "Đại học Nông nghiệp Hà Nội",
    "Đại học Thủy lợi",
    "Đại học Mỏ - Địa chất",
    "Đại học Dược Hà Nội",
    "Đại học Luật Hà Nội"
  ];
  
  console.log(`📋 Preparing to add ${universities.length} universities...`);
  
  for (let i = 0; i < universities.length; i++) {
    const university = universities[i];
    
    try {
      const isAlreadyApproved = await contract.universityApproved(university);
      
      if (isAlreadyApproved) {
        console.log(`✅ ${i+1}. ${university} - Already approved`);
      } else {
        console.log(`🔄 ${i+1}. Adding: ${university}...`);
        const tx = await contract.approveUniversity(university);
        await tx.wait();
        console.log(`✅ ${i+1}. ${university} - Added successfully`);
      }
    } catch (error) {
      console.error(`❌ Error adding ${university}:`, error.message);
    }
  }
  
  console.log("\n🎉 University addition process completed!");
  
  // Verification
  console.log("\n🔍 Verification - Checking first 3 universities:");
  for (let i = 0; i < 3; i++) {
    const uni = universities[i];
    const isApproved = await contract.universityApproved(uni);
    console.log(`${uni}: ${isApproved ? '✅ Approved' : '❌ Not approved'}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});