export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      incidents: {
        Row: {
          id: number
          type: string
          description: Json
          location: string
          status: string
          created_at: string
          updated_at: string
          latitude: number
          longitude: number
        }
        Insert: {
          id?: never
          type: string
          description: Json
          location: string
          status?: string
          created_at?: string
          updated_at?: string
          latitude: number
          longitude: number
        }
        Update: {
          id?: never
          type?: string
          description?: Json
          location?: string
          status?: string
          created_at?: string
          updated_at?: string
          latitude?: number
          longitude?: number
        }
      }
    }
  }
} 