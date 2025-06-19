# 📋 Các Field được sử dụng để tạo Certificate

## 🎯 **Mapping từ AcademicRecord sang Certificate Data**

### **Trong RecordDetail.tsx**
```tsx
const certificateData = {
  studentAddress: walletAddress,        // 🔗 Từ wallet đã connect
  studentName: record.studentName,      // 👤 Từ AcademicRecord
  studentId: record.studentId,          // 🆔 Từ AcademicRecord  
  degree: record.degree,                // 🎓 Từ AcademicRecord
  major: record.major,                  // 📚 Từ AcademicRecord
  university: record.institutionName,   // 🏫 Từ AcademicRecord
  gpa: record.gpa.toString()           // 📊 Từ AcademicRecord (convert to string)
};
```

## 🔧 **Xử lý trong Web3Service.issueCertificate()**

### **Parameters được gửi lên Smart Contract:**
```typescript
const tx = await this.contract.issueCertificate(
  data.studentAddress,                  // recipient (address)
  data.studentName,                     // studentName (string)
  data.studentId,                       // studentId (string)
  data.degree,                          // degree (string)
  data.major,                           // major (string)
  data.university,                      // university (string)
  Math.floor(Date.now() / 1000),       // graduationDate (uint256) - Current timestamp
  `QmHash${Date.now()}`,               // ipfsHash (string) - Mock IPFS hash
  data.gpa                             // gpa (string)
);
```

## 📝 **Smart Contract Function Signature**
```solidity
function issueCertificate(
    address recipient,           // 🔗 Wallet address nhận certificate
    string memory studentName,   // 👤 Tên sinh viên
    string memory studentId,     // 🆔 Mã sinh viên (unique)
    string memory degree,        // 🎓 Loại bằng cấp
    string memory major,         // 📚 Chuyên ngành
    string memory university,    // 🏫 Tên trường học
    uint256 graduationDate,      // 📅 Ngày tốt nghiệp (timestamp)
    string memory ipfsHash,      // 📄 IPFS hash (cho metadata)
    string memory gpa           // 📊 Điểm GPA
) public onlyIssuer nonReentrant validStudentId(studentId) approvedUniversity(university)
```

## 🗂️ **Chi tiết từng Field**

### **1. Từ AcademicRecord (Database)**
| Field | Nguồn | Mô tả | Ví dụ |
|-------|-------|-------|--------|
| `studentName` | `record.studentName` | Tên đầy đủ sinh viên | "Nguyễn Văn A" |
| `studentId` | `record.studentId` | Mã sinh viên (unique) | "SV001234" |
| `degree` | `record.degree` | Loại bằng cấp | "Cử nhân" |
| `major` | `record.major` | Chuyên ngành | "Công nghệ thông tin" |
| `university` | `record.institutionName` | Tên trường | "Đại học Bách Khoa Hà Nội" |
| `gpa` | `record.gpa.toString()` | Điểm GPA | "3.75" |

### **2. Từ hệ thống (Auto-generated)**
| Field | Nguồn | Mô tả | Ví dụ |
|-------|-------|-------|--------|
| `studentAddress` | `walletAddress` | Địa chỉ ví nhận certificate | "0xabcd..." |
| `graduationDate` | `Date.now()` | Timestamp hiện tại | 1703260800 |
| `ipfsHash` | `QmHash${Date.now()}` | Mock IPFS hash | "QmHash1703260800" |

## ⚠️ **Các field bị thiếu từ AcademicRecord**

### **Fields có trong AcademicRecord nhưng KHÔNG dùng:**
- `record.id` - ID trong database
- `record.institutionId` - ID trường học  
- `record.graduationDate` - Ngày tốt nghiệp thực tế (không dùng, dùng timestamp hiện tại)
- `record.certificateHash` - Hash đã tạo từ trước
- `record.transactionHash` - Sẽ được cập nhật sau khi tạo
- `record.status` - Trạng thái record
- `record.createdAt` / `record.updatedAt` - Timestamps database

## 🔄 **Quy trình xử lý**

```
AcademicRecord (Database)
         ↓
Extract 6 fields + walletAddress
         ↓
Add auto-generated fields (graduationDate, ipfsHash)  
         ↓
Call smart contract issueCertificate()
         ↓
Blockchain creates NFT with Certificate data
         ↓
Return tokenId + transactionHash
         ↓
Update AcademicRecord.transactionHash
```

## 🎯 **Lưu ý quan trọng**

1. **graduationDate**: Dùng timestamp hiện tại thay vì `record.graduationDate`
2. **ipfsHash**: Hiện tại là mock value, cần implement IPFS thực tế
3. **studentAddress**: Dùng wallet của người phê duyệt, không phải sinh viên
4. **university**: Phải được approve trước trong smart contract
5. **studentId**: Phải unique, không được trùng lặp

## 🚀 **Cải tiến có thể thực hiện**

1. **Sử dụng graduationDate thực tế**: 
   ```tsx
   graduationDate: new Date(record.graduationDate).getTime() / 1000
   ```

2. **Thêm student wallet address**:
   ```tsx
   studentAddress: record.studentWalletAddress || walletAddress
   ```

3. **Upload metadata lên IPFS thực tế**:
   ```tsx
   ipfsHash: await uploadToIPFS(certificateMetadata)
   ```
