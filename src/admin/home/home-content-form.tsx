import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import PageHeader from "@/common/page-header";
import { homeContentApi, HomeContentInput, TrustBadge } from '@/services/home-service';
import TrustBadgeField from './components/TrustBadgeField'
import ImageUpload from '@/common/ui/image-upload'
import IconPicker from '@/common/ui/icon-picker'

const CONTENT_TYPES = [
    { value: 'hero', label: 'Hero' },
    { value: 'stat', label: 'Stat' },
]

const getInitialForm = (type: string): HomeContentInput => {
    const base = { content_type: type as any, item_index: 0, title: '', heading: '', subtitle: '', description: '', text: '', label: '', value: '', trust_badge: [] as TrustBadge[], icon: '', image: '' }
    if (type === 'stat') return { ...base, title: '', heading: '', subtitle: '', description: '', text: '', trust_badge: [] as TrustBadge[], image: '' }
    return base
}

const HomeContentForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditing = Boolean(id)
    const [formData, setFormData] = useState<HomeContentInput>(() => getInitialForm('hero'))
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (isEditing) {
            const fetchItem = async () => {
                try {
                    setLoading(true)
                    const item = await homeContentApi.getById(id!)
                    const baseData = {
                        content_type: item.attributes.content_type,
                        item_index: item.attributes.item_index,
                        title: item.attributes.title || '',
                        heading: item.attributes.heading || '',
                        subtitle: item.attributes.subtitle || '',
                        description: item.attributes.description || '',
                        text: item.attributes.text || '',
                        label: item.attributes.label || '',
                        value: item.attributes.value || '',
                        trust_badge: item.attributes.trust_badge || [] as TrustBadge[],
                        icon: item.attributes.icon || '',
                        image: item.attributes.image?.attributes?.url || '',
                    }
                    setFormData(item.attributes.content_type === 'stat'
                        ? { ...baseData, title: '', heading: '', subtitle: '', description: '', text: '', trust_badge: [] as TrustBadge[], image: '' }
                        : baseData
                    )
                } catch (err) {
                    setError('Failed to load content')
                } finally {
                    setLoading(false)
                }
            }
            fetchItem()
        }
    }, [id, isEditing])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setSaving(true)
            
            // Prepare form data - if image is empty string and editing, it means delete
            const submitData = { ...formData }
            if (isEditing && formData.image === '') {
                // Explicitly send empty string to trigger deletion
                submitData.image = ''
            }
            
            if (isEditing) {
                await homeContentApi.update(id!, submitData)
            } else {
                await homeContentApi.create(submitData)
            }
            navigate('/admin/home')
        } catch (err) {
            setError(isEditing ? 'Failed to update content' : 'Failed to create content')
        } finally {
            setSaving(false)
        }
    }

    const handleChange = (field: keyof HomeContentInput, value: string | number | TrustBadge[]) => {
        if (field === 'content_type') {
            setFormData(getInitialForm(value as string))
        } else {
            setFormData(prev => ({ ...prev, [field]: value }))
        }
    }

    const handleImageDelete = async () => {
        if (isEditing && id) {
            try {
                await homeContentApi.deleteImage(id)
                setFormData(prev => ({ ...prev, image: '' }))
            } catch (err) {
                setError('Failed to delete image')
            }
        } else {
            // For new content, just clear the image field
            setFormData(prev => ({ ...prev, image: '' }))
        }
    }

    const isStat = formData.content_type === 'stat'
    const isHero = formData.content_type === 'hero'

    if (loading) return (
        <div className="h-full flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
    )

    return (
        <div className="h-full flex flex-col">
            <PageHeader
                title={isEditing ? 'Edit Home Content' : 'Add Home Content'}
                subtitle={isEditing ? 'Update content details' : 'Create new content'}
                buttonLabel="Back"
                buttonIcon={<ArrowLeft className="w-4 h-4" />}
                onButtonClick={() => navigate('/admin/home')}
            />

            <div className="flex-1 overflow-auto mt-2">
                {error && (
                    <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Content Type *</label>
                                        <select
                                            value={formData.content_type}
                                            onChange={(e) => handleChange('content_type', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            {CONTENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Item Index *</label>
                                        <input
                                            type="number"
                                            value={formData.item_index}
                                            onChange={(e) => handleChange('item_index', parseInt(e.target.value) || 0)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {!isStat && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="space-y-4">
                                        {['title', 'heading', 'subtitle'].map((field) => (
                                            <div key={field}>
                                                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
                                                <input
                                                    type="text"
                                                    value={(formData[field as keyof HomeContentInput] as string) || ''}
                                                    onChange={(e) => handleChange(field as keyof HomeContentInput, e.target.value)}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder={`Enter ${field}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {isHero && (
                                <TrustBadgeField
                                    badges={formData.trust_badge || []}
                                    onChange={(badges) => handleChange('trust_badge', badges)}
                                />
                            )}
                        </div>

                        <div className="space-y-6">
                            {!isStat && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="space-y-4">
                                        {['description', 'text'].map((field) => (
                                            <div key={field}>
                                                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
                                                <textarea
                                                    value={(formData[field as keyof HomeContentInput] as string) || ''}
                                                    onChange={(e) => handleChange(field as keyof HomeContentInput, e.target.value)}
                                                    rows={4}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                                    placeholder={`Enter ${field}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {isHero && (
                                <ImageUpload
                                    value={formData.image || ''}
                                    onChange={(base64) => handleChange('image', base64)}
                                    onDelete={handleImageDelete}
                                    label="Hero Image"
                                />
                            )}

                            {!isHero && (
                                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        {['label', 'value'].map((field) => (
                                            <div key={field}>
                                                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                                    {field} {isStat ? '*' : ''}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={(formData[field as keyof HomeContentInput] as string) || ''}
                                                    onChange={(e) => handleChange(field as keyof HomeContentInput, e.target.value)}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder={`Enter ${field}`}
                                                    required={isStat}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {isStat && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Icon *
                                            </label>
                                            <IconPicker
                                                value={formData.icon || ''}
                                                onChange={(iconName) => handleChange('icon', iconName)}
                                                placeholder="Select an icon for this stat"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-6 border-t">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/home')}
                            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 flex items-center space-x-2 transition-colors"
                        >
                            {saving ? (
                                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Saving...</span></>
                            ) : (
                                <><Check className="w-4 h-4" /><span>{isEditing ? 'Update Content' : 'Create Content'}</span></>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HomeContentForm
