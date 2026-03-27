import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export interface HomeContentItem {
  id?: string
  content_type: 'stats' | 'services' | 'why_us_points' | 'cta_banners'
  item_index: number
  title?: string
  subtitle?: string
  value?: string
  label?: string
  description?: string
  text?: string
  heading?: string
  created_at?: string
  updated_at?: string
}

export interface AboutContentItem {
  id?: string
  content_type: 'team_member' | 'milestone' | 'story' | 'mission_vision'
  item_index: number
  name?: string
  role?: string
  image?: string
  bio?: string
  year?: string
  text?: string
  heading?: string
  subtitle?: string
  paragraphs?: string[]
  mission?: string
  vision?: string
  created_at?: string
  updated_at?: string
}

export interface ServiceContentItem {
  id?: string
  content_type: 'service'
  item_index: number
  service_id: string
  title: string
  tagline?: string
  description?: string
  image?: string
  features?: string[]
  created_at?: string
  updated_at?: string
}

// Simplified supabase client without complex typing
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchHomeContent(contentType: HomeContentItem['content_type']) {
  const { data, error } = await supabase
    .from('home_content')
    .select('*')
    .eq('content_type', contentType)
    .order('item_index', { ascending: true })

  if (error) {
    console.error('Error fetching home content:', error)
    return []
  }

  return data as HomeContentItem[] || []
}

export async function saveHomeContent(item: Omit<HomeContentItem, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('home_content')
    .upsert(item as any, {
      onConflict: 'content_type,item_index'
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving home content:', error)
    return null
  }

  return data as HomeContentItem
}

export async function deleteHomeContent(contentType: HomeContentItem['content_type'], itemIndex: number) {
  const { error } = await supabase
    .from('home_content')
    .delete()
    .eq('content_type', contentType)
    .eq('item_index', itemIndex)

  if (error) {
    console.error('Error deleting home content:', error)
    return false
  }

  return true
}

export async function reorderHomeContent(contentType: HomeContentItem['content_type'], items: { id: string; item_index: number }[]) {
  try {
    for (const item of items) {
      const { error } = await supabase
        .from('home_content')
        .update({ item_index: item.item_index })
        .eq('id', item.id)
      
      if (error) {
        throw error
      }
    }
    return true
  } catch (error) {
    console.error('Error reordering home content:', error)
    return false
  }
}

// About content functions
export async function fetchAboutContent(contentType: AboutContentItem['content_type']) {
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .eq('content_type', contentType)
    .order('item_index', { ascending: true })

  if (error) {
    console.error('Error fetching about content:', error)
    return []
  }

  return data as AboutContentItem[] || []
}

export async function saveAboutContent(item: Omit<AboutContentItem, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('about_content')
    .upsert(item as any, {
      onConflict: 'content_type,item_index'
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving about content:', error)
    return null
  }

  return data as AboutContentItem
}

export async function deleteAboutContent(contentType: AboutContentItem['content_type'], itemIndex: number) {
  const { error } = await supabase
    .from('about_content')
    .delete()
    .eq('content_type', contentType)
    .eq('item_index', itemIndex)

  if (error) {
    console.error('Error deleting about content:', error)
    return false
  }

  return true
}

export async function reorderAboutContent(contentType: AboutContentItem['content_type'], items: { id: string; item_index: number }[]) {
  try {
    for (const item of items) {
      const { error } = await supabase
        .from('about_content')
        .update({ item_index: item.item_index })
        .eq('id', item.id)
      
      if (error) {
        throw error
      }
    }
    return true
  } catch (error) {
    console.error('Error reordering about content:', error)
    return false
  }
}

// Services content functions
export async function fetchServicesContent() {
  const { data, error } = await supabase
    .from('services_content')
    .select('*')
    .order('item_index', { ascending: true })

  if (error) {
    console.error('Error fetching services content:', error)
    return []
  }

  return data as ServiceContentItem[] || []
}

export async function saveServiceContent(item: Omit<ServiceContentItem, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('services_content')
    .upsert(item as any, {
      onConflict: 'service_id'
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving service content:', error)
    return null
  }

  return data as ServiceContentItem
}

export async function deleteServiceContent(serviceId: string) {
  const { error } = await supabase
    .from('services_content')
    .delete()
    .eq('service_id', serviceId)

  if (error) {
    console.error('Error deleting service content:', error)
    return false
  }

  return true
}

export async function reorderServicesContent(items: { id: string; item_index: number }[]) {
  try {
    for (const item of items) {
      const { error } = await supabase
        .from('services_content')
        .update({ item_index: item.item_index })
        .eq('id', item.id)
      
      if (error) {
        throw error
      }
    }
    return true
  } catch (error) {
    console.error('Error reordering services content:', error)
    return false
  }
}
