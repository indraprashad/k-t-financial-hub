import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from './button'
import { uploadImage, deleteImage } from '@/common/imageUpload'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  className?: string
  folder?: string
}

export function ImageUpload({ value, onChange, className = '', folder = 'team-images' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string>(value || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    setUploading(true)

    try {
      const result = await uploadImage(file, folder)
      
      if (result.error) {
        alert(`Upload failed: ${result.error}`)
        return
      }

      setPreview(result.url)
      onChange(result.url)
    } catch (error) {
      alert('Upload failed. Please try again.')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    if (preview) {
      try {
        await deleteImage(preview)
      } catch (error) {
        console.error('Error deleting image:', error)
      }
    }
    
    setPreview('')
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              disabled={uploading}
            >
              <X className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
        >
          <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            Click to upload image
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, GIF up to 5MB
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Choose Image
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
