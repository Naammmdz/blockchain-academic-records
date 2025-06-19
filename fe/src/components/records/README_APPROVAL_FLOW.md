# 🔄 Luồng Phê Duyệt Certificate Mới

## 📋 Thay đổi quy trình

### ❌ **Quy trình cũ (CertificateForm)**
```
Nhập form → Validate → Tạo certificate trên blockchain ngay lập tức
```

### ✅ **Quy trình mới (RecordDetail Approval)**
```
1. Tạo AcademicRecord (trạng thái 'pending')
2. Xem chi tiết trong RecordDetail  
3. Nhấn "Phê duyệt" → Tạo certificate trên blockchain
4. Cập nhật trạng thái → 'verified' + transactionHash
```

## 🔧 **Tính năng đã thêm vào RecordDetail**

### **1. State Management**
```tsx
const [isProcessing, setIsProcessing] = useState(false);
const { addNotification } = useNotifications();
const { updateRecord } = useStore();
```

### **2. Approval Handler**
```tsx
const handleApprove = async () => {
  // 1. Connect wallet
  const walletAddress = await web3Service.connectWallet();
  
  // 2. Prepare certificate data
  const certificateData = {
    studentAddress: walletAddress,
    studentName: record.studentName,
    studentId: record.studentId,
    degree: record.degree,
    major: record.major,
    university: record.institutionName,
    gpa: record.gpa.toString()
  };

  // 3. Issue certificate on blockchain
  const result = await web3Service.issueCertificate(certificateData);
  
  // 4. Update record status
  updateRecord(record.id, {
    status: 'verified',
    transactionHash: result.txHash,
    updatedAt: new Date().toISOString()
  });
}
```

### **3. Rejection Handler**
```tsx
const handleReject = async () => {
  updateRecord(record.id, {
    status: 'rejected',
    updatedAt: new Date().toISOString()
  });
}
```

### **4. UI Changes**
- Loading states cho buttons
- Disable buttons khi đang xử lý
- Hiển thị "Xem trên Blockchain" cho records đã verified
- Thông báo realtime cho user

## 🎯 **Lợi ích của quy trình mới**

1. **Kiểm soát tốt hơn**: Admin có thể review trước khi tạo certificate
2. **Tiết kiệm gas**: Chỉ tạo certificate khi thật sự cần
3. **Audit trail**: Có thể track lịch sử phê duyệt
4. **Flexibility**: Có thể từ chối hoặc yêu cầu chỉnh sửa
5. **User Experience**: Feedback rõ ràng về trạng thái

## 🔄 **Luồng hoàn chỉnh**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   RecordForm    │───▶│  AcademicRecord  │───▶│  RecordDetail   │
│   (Create)      │    │   (pending)      │    │   (Review)      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
                               ┌─────────────────────────────────────┐
                               │          Decision?                  │
                               └─────────────────────────────────────┘
                                        │              │
                                   ┌────▼────┐    ┌────▼────┐
                                   │ Approve │    │ Reject  │
                                   └────┬────┘    └────┬────┘
                                        ▼              ▼
                           ┌─────────────────────┐    ┌──────────────┐
                           │ Create Certificate  │    │   Update     │
                           │   on Blockchain     │    │   Status     │
                           └─────────────────────┘    │ (rejected)   │
                                        │             └──────────────┘
                                        ▼
                           ┌─────────────────────┐
                           │ Update Record       │
                           │ (verified + hash)   │
                           └─────────────────────┘
```

## ⚠️ **Lưu ý khi sử dụng**

1. **Wallet Connection**: Cần connect MetaMask trước khi phê duyệt
2. **ISSUER Role**: Wallet phải có quyền ISSUER_ROLE trên contract
3. **Network**: Đảm bảo đang kết nối đúng network (localhost:8545)
4. **Gas Fee**: Cần có đủ ETH để trả gas fee
5. **Error Handling**: Xử lý các trường hợp lỗi kết nối, thiếu quyền, etc.
