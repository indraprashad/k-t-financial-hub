// Simple image upload utilities for Django backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export interface UploadResult {
  url: string;
  error?: string;
}

/**
 * Upload an image file to the Django backend
 * For now, returns a data URL for immediate preview
 * In production, this should upload to Django's media storage
 */
export async function uploadImage(file: File, folder: string = 'images'): Promise<UploadResult> {
  try {
    // Convert file to data URL for immediate preview
    // In production, replace this with actual upload to Django backend
    const dataUrl = await fileToDataUrl(file);
    
    // TODO: Implement actual upload to Django backend when media endpoint is ready
    // const formData = new FormData();
    // formData.append('image', file);
    // formData.append('folder', folder);
    // 
    // const response = await fetch(`${API_URL}/upload/`, {
    //   method: 'POST',
    //   body: formData,
    // });
    // 
    // if (!response.ok) throw new Error('Upload failed');
    // const data = await response.json();
    // return { url: data.url };
    
    return { url: dataUrl };
  } catch (error) {
    console.error('Image upload error:', error);
    return { url: '', error: 'Failed to upload image' };
  }
}

/**
 * Delete an image - currently just logs as we're using data URLs
 * In production, this should call Django backend to delete from storage
 */
export async function deleteImage(url: string): Promise<void> {
  // If it's a data URL, nothing to delete on server
  if (url.startsWith('data:')) {
    return;
  }
  
  // TODO: Implement actual delete when media endpoint is ready
  // await fetch(`${API_URL}/delete-image/`, {
  //   method: 'POST',
  //   body: JSON.stringify({ url }),
  // });
  
  console.log('Image deleted:', url);
}

/**
 * Convert File to Data URL for preview
 */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
