import { useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface Props {
    value?: string
    onChange: (base64: string | null) => void
    onDelete?: () => Promise<void>
    label?: string
    className?: string
}

export const ImageUpload = ({ value, onChange, onDelete, label = "Image", className = "" }: Props) => {
    const [preview, setPreview] = useState<string | null>(value || null)
    const [dragActive, setDragActive] = useState(false)

    const handleFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setPreview(result)
                onChange(result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragActive(false)
        const file = e.dataTransfer.files[0]
        handleFile(file)
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFile(file)
    }

    const removeImage = async () => {
        if (onDelete) {
            await onDelete()
        }
        setPreview(null)
        onChange(null)
    }

    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            
            {preview ? (
                <div className="relative group">
                    <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                    onDragLeave={() => setDragActive(false)}
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragActive 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
            )}
        </div>
    )
}

export default ImageUpload
