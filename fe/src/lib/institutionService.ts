import { supabase } from './supabase';
import { Institution } from '../types';

export class InstitutionService {
  static async getAllInstitutions(): Promise<Institution[]> {
    try {
      console.log('Fetching institutions from Supabase...');
      const { data, error } = await supabase
        .from('institutions')
        .select('id, name, type, address, established_year, phone, email, student_count, verified, created_at, updated_at')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching institutions:', error.message);
        return [];
      }
      
      console.log('Institutions fetched:', data);
      return (data as Institution[]) || [];
    } catch (error) {
      console.error('Exception fetching institutions:', error);
      return [];
    }
  }

  static async createInstitution(institution: Omit<Institution, 'id'>) {
    try {
      console.log('Creating institution:', institution);
      const { data, error } = await supabase
        .from('institutions')
        .insert([{ ...institution }])
        .select()
        .single();
        
      if (error) {
        console.error('Error creating institution:', error);
        throw new Error(error.message);
      }
      
      console.log('Institution created:', data);
      return data;
    } catch (error) {
      console.error('Exception creating institution:', error);
      throw error;
    }
  }

  static async verifyInstitution(id: string): Promise<void> {
    try {
      console.log('Verifying institution with ID:', id);
      
      // First check if institution exists
      const { data: existing, error: checkError } = await supabase
        .from('institutions')
        .select('*')
        .eq('id', id)
        .single();
        
      if (checkError) {
        console.error('Error checking institution:', checkError);
        throw new Error(`Không tìm thấy cơ sở: ${checkError.message}`);
      }
      
      console.log('Found institution:', existing);
      
      if (existing.verified) {
        console.log('Institution already verified');
        return; // Already verified
      }
      
      // Update verification status
      const { data, error } = await supabase
        .from('institutions')
        .update({ 
          verified: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
        
      if (error) {
        console.error('Supabase update error:', error);
        throw new Error(`Không thể xác minh: ${error.message}`);
      }
      
      if (!data) {
        throw new Error('Không có dữ liệu trả về sau khi cập nhật');
      }
      
      console.log('Institution verified successfully:', data);
    } catch (error) {
      console.error('Error verifying institution:', error);
      throw error;
    }
  }

  static async deleteInstitution(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('institutions')
        .delete()
        .eq('id', id);
      if (error) throw new Error(error.message);
    } catch (error) {
      console.error('Error deleting institution:', error);
      throw error;
    }
  }
}