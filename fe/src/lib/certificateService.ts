import { supabase } from './supabase' // Import supabase client vừa tạo
import { AcademicRecord } from '../types'; // Import AcademicRecord type
import { Institution } from '../types';

// Định nghĩa interface cho Certificate object
export interface Certificate {
  id?: string; // UUID từ Supabase
  student_id?: string; // ID sinh viên
  student_name: string;
  degree_type: string;
  major: string;
  graduation_date: string; // Format YYYY-MM-DD
  university: string;
  institution_id?: string; // ID trường học
  gpa?: number; // GPA của sinh viên
  certificate_hash?: string; // SHA256 hash của thông tin bằng cấp
  blockchain_tx_hash?: string | null; // Transaction hash sau khi ghi lên blockchain
  created_at?: string; // Timestamp từ Supabase
}

export class CertificateService {
  /**
   * Tạo hash cho bằng cấp.
   * Trong thực tế, nên sử dụng thư viện crypto an toàn hơn.
   * Đây là ví dụ đơn giản.
   */  static generateCertificateHash(cert: Omit<Certificate, 'id' | 'certificate_hash' | 'blockchain_tx_hash' | 'created_at'>): string {
    const dataString = `${cert.student_name}-${cert.degree_type}-${cert.major}-${cert.graduation_date}-${cert.university || 'Default University'}-${cert.gpa || 0}`;
    // Đơn giản hóa việc hash cho ví dụ, bạn có thể dùng thư viện crypto mạnh hơn
    // Convert to a simple hash-like string (không phải crypto-secure)
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
        const char = dataString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return `hash_${Math.abs(hash).toString(16)}`;
  }

  /**
   * Tạo một bằng cấp mới trong Supabase.
   */
  static async createCertificate(certData: Omit<Certificate, 'id' | 'certificate_hash' | 'blockchain_tx_hash' | 'created_at'>): Promise<Certificate | null> {
    const hash = this.generateCertificateHash(certData);
    
    const newCertificate = {
      ...certData,
      certificate_hash: hash,
      university: certData.university || 'Đại học ABC', // Giá trị mặc định nếu không cung cấp
    };

    const { data, error } = await supabase
      .from('certificates') // Tên bảng của bạn
      .insert(newCertificate)
      .select()
      .single(); // Giả định rằng insert trả về một record

    if (error) {
      console.error('Error creating certificate in Supabase:', error.message);
      return null;
    }
    console.log('Certificate created successfully in Supabase:', data);
    return data as Certificate;
  }

  /**
   * Lấy tất cả bằng cấp từ Supabase.
   */
  static async getAllCertificates(): Promise<Certificate[]> {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching certificates:', error.message);
      return [];
    }
    return (data as Certificate[]) || [];
  }

  /**
   * Tìm bằng cấp bằng certificate_hash.
   */
  static async getCertificateByHash(hash: string): Promise<Certificate | null> {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('certificate_hash', hash)
      .single();

    if (error) {
      // Không phải lỗi nghiêm trọng nếu không tìm thấy, chỉ là không có data
      if (error.code !== 'PGRST116') { // PGRST116: "Query returned no rows"
         console.error('Error fetching certificate by hash:', error.message);
      }
      return null;
    }
    return data as Certificate;
  }
  
  /**
   * Cập nhật thông tin bằng cấp (ví dụ: thêm blockchain_tx_hash sau khi ghi lên chain).
   */
  static async updateCertificateWithTxHash(certificateHash: string, txHash: string): Promise<Certificate | null> {
    const { data, error } = await supabase
      .from('certificates')
      .update({ blockchain_tx_hash: txHash })
      .eq('certificate_hash', certificateHash)
      .select()
      .single();

    if (error) {
      console.error('Error updating certificate with txHash:', error.message);
      return null;
    }
    console.log('Certificate updated with txHash:', data);
    return data as Certificate;
  }

  /**
   * Chuyển đổi Certificate thành AcademicRecord
   */  static convertCertificateToAcademicRecord(cert: Certificate): AcademicRecord {
    return {
      id: cert.id || `cert_${Date.now()}`,
      studentId: cert.student_id || `SV${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`, // Sử dụng student_id từ Supabase hoặc generate
      studentName: cert.student_name,
      institutionId: cert.institution_id || `inst_${Math.floor(Math.random() * 100)}`, // Sử dụng institution_id từ Supabase hoặc generate
      institutionName: cert.university || 'Unknown Institution',
      degree: cert.degree_type,
      major: cert.major,
      gpa: cert.gpa || 0, // Lấy GPA từ Supabase, default 0 nếu không có
      graduationDate: cert.graduation_date,
      certificateHash: cert.certificate_hash || '',
      transactionHash: cert.blockchain_tx_hash || '',
      status: cert.blockchain_tx_hash ? 'verified' : 'pending' as 'verified' | 'pending',
      createdAt: cert.created_at || new Date().toISOString(),
      updatedAt: cert.created_at || new Date().toISOString()
    };
  }

  /**
   * Lấy tất cả hồ sơ học tập từ Supabase và chuyển đổi sang định dạng AcademicRecord
   */
  static async getAllAcademicRecords(): Promise<AcademicRecord[]> {
    try {
      const certificates = await this.getAllCertificates();
      return certificates.map(cert => this.convertCertificateToAcademicRecord(cert));
    } catch (error) {
      console.error('Error fetching academic records:', error);
      return [];
    }
  }
}

export class InstitutionService {
  static async getAllInstitutions(): Promise<Institution[]> {
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching institutions:', error.message);
      return [];
    }
    return (data as Institution[]) || [];
  }
}