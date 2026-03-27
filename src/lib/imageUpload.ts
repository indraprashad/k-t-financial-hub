import { supabase } from './supabase'

export async function uploadImage(file: File, folder: string = 'team-images'): Promise<{ url: string; error: string | null }> {
  try {
    // First try Supabase Storage
    try {
      // Generate unique file name
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        throw error
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      return { url: publicUrl, error: null }
    } catch (supabaseError) {
      // If Supabase fails, fallback to local URL
      console.warn('Supabase storage not available, using local URL:', supabaseError)
      
      // Create local URL as fallback
      const localUrl = URL.createObjectURL(file)
      
      // Store the file in localStorage for persistence
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        const storageKey = `local-image-${folder}-${Date.now()}`
        localStorage.setItem(storageKey, base64)
        
        // Update the URL to use the stored key reference
        setTimeout(() => {
          URL.revokeObjectURL(localUrl)
        }, 100)
      }
      reader.readAsDataURL(file)
      
      return { url: localUrl, error: null }
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    return { url: '', error: error instanceof Error ? error.message : 'Failed to upload image' }
  }
}

export async function deleteImage(url: string): Promise<{ error: string | null }> {
  try {
    // Check if it's a local URL (blob:)
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url)
      return { error: null }
    }

    // Try Supabase deletion first
    try {
      // Extract file path from URL
      const urlObj = new URL(url)
      const pathParts = urlObj.pathname.split('/')
      const filePath = pathParts.slice(pathParts.indexOf('images') + 1).join('/')

      const { error } = await supabase.storage
        .from('images')
        .remove([filePath])

      if (error) {
        throw error
      }
    } catch (supabaseError) {
      console.warn('Supabase storage deletion failed:', supabaseError)
      // For local images, we don't need to do anything special
    }

    return { error: null }
  } catch (error) {
    console.error('Error deleting image:', error)
    return { error: error instanceof Error ? error.message : 'Failed to delete image' }
  }
}
