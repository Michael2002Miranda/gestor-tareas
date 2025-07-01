import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export type Task = {
  id: string
  title: string
  description: string | null
  completed: boolean
  priority: "low" | "medium" | "high"
  due_date: string | null
  user_id: string
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  email: string | null
  full_name: string | null
  created_at: string
}
