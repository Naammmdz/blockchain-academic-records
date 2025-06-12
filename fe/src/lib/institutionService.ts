import { supabase } from './supabase';
import { Institution } from '../types';

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

  static async createInstitution(institution: Omit<Institution, 'id'>) {
    const { data, error } = await supabase
      .from('institutions')
      .insert([{ ...institution }])
      .select()
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
} 