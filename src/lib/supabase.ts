import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type Database = {
  public: {
    Functions: {
      delete_my_account: {
        Args: Record<string, never>
        Returns: undefined
      }
    }
    Tables: {
      profiles: {
        Row: Profile
        Insert: ProfileInsert
        Update: ProfileUpdate
        Relationships: []
      }
      resources: {
        Row: Resource
        Insert: ResourceInsert
        Update: ResourceUpdate
        Relationships: []
      }
      check_ins: {
        Row: CheckIn
        Insert: CheckInInsert
        Update: CheckInUpdate
        Relationships: []
      }
      posts: {
        Row: Post
        Insert: PostInsert
        Update: PostUpdate
        Relationships: []
      }
      resource_bookmarks: {
        Row: ResourceBookmark
        Insert: ResourceBookmarkInsert
        Update: never
        Relationships: []
      },
      post_reports: {
        Row: PostReport
        Insert: PostReportInsert
        Update: never
        Relationships: []
      }
    }
  }
}

export type Role = 'Community Health Worker' | 'Nurse' | 'Clinic Support' | 'Facilitator' | 'Admin'
export type ResourceCategory = 'Burnout' | 'Legal Rights' | 'Safety' | 'Mental Health'
export type ShiftType = 'Day Shift' | 'Night Shift' | 'Overtime'

export type Profile = {
  id: string
  full_name: string
  role: Role
  facility: string
  phone: string | null
  notifications_enabled: boolean
  theme: 'system' | 'light' | 'dark'
  created_at: string
  updated_at: string
}
export type ProfileInsert = Omit<Profile, 'created_at' | 'updated_at'>
export type ProfileUpdate = Partial<Pick<Profile, 'full_name' | 'role' | 'facility' | 'phone' | 'notifications_enabled' | 'theme'>>

export type Resource = {
  id: string
  title: string
  category: ResourceCategory
  description: string
  url: string | null
  is_published: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}
export type ResourceInsert = Omit<Resource, 'id' | 'created_at' | 'updated_at'>
export type ResourceUpdate = Partial<Omit<ResourceInsert, 'created_by'>>

export type CheckIn = {
  id: string
  user_id: string
  fatigue: number
  mood: number
  hours_worked: number | null
  shift_type: ShiftType
  notes: string | null
  created_at: string
  updated_at: string
}
export type CheckInInsert = Omit<CheckIn, 'id' | 'created_at' | 'updated_at'>
export type CheckInUpdate = Partial<Pick<CheckIn, 'fatigue' | 'mood' | 'hours_worked' | 'shift_type' | 'notes'>>

export type Post = {
  id: string
  author_id: string
  body: string
  category: 'General' | 'Nursing' | 'CHW' | 'Night Shift Support' | 'CHW Community'
  is_anonymous: boolean
  created_at: string
  updated_at: string
}
export type PostInsert = Omit<Post, 'id' | 'created_at' | 'updated_at'>
export type PostUpdate = Partial<Pick<Post, 'body' | 'category' | 'is_anonymous'>>

export type ResourceBookmark = {
  user_id: string
  resource_id: string
  created_at: string
}
export type ResourceBookmarkInsert = Omit<ResourceBookmark, 'created_at'>
export type PostReport = {
  id: string
  post_id: string
  reporter_id: string
  reason: string
  created_at: string
}
export type PostReportInsert = Omit<PostReport, 'id' | 'created_at'>

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabaseConfigError = url && anonKey
  ? null
  : 'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'

export const supabase: SupabaseClient | null = url && anonKey
  ? createClient(url, anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
  : null
