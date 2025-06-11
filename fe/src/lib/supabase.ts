import { createClient } from '@supabase/supabase-js'

// Lấy Supabase URL và Anon Key từ biến môi trường
// Lưu ý: Trong React (hoặc Create React App), biến môi trường cần bắt đầu bằng REACT_APP_
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Kiểm tra xem biến môi trường đã được set chưa
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required. Make sure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY are set in your .env.local file in the 'fe' folder.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Hàm test connection đơn giản (optional, có thể gọi từ component để test)
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('certificates') // Sử dụng tên bảng của bạn
      .select('id')
      .limit(1)

    if (error) {
      console.error('❌ Supabase connection error:', error.message)
      return false
    }
    console.log('✅ Supabase connected successfully. Test data:', data)
    return true
  } catch (err) {
    console.error('❌ Supabase connection failed:', err)
    return false
  }
}