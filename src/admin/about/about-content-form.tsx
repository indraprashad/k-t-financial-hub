import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import PageHeader from "@/common/page-header";
import { AboutServices, AboutContent } from '@/services/about-services';
import { HeroFields, TeamMemberFields, ValueFields, TimelineFields, ImageSection, ParagraphsSection } from './components/AboutFormFields'

const CONTENT_TYPES = [
    { value: 'hero', label: 'Hero' },
    { value: 'team_member', label: 'Team Member' },
    { value: 'value', label: 'Value' },
    { value: 'timeline_event', label: 'Timeline Event' },
]

interface FormData {
    content_type: string; item_index: number; heading?: string; subtitle?: string
    text?: string; paragraphs?: string[]; name?: string; role?: string; bio?: string
    image?: string; mission?: string; vision?: string; year?: string
}

const getInitialForm = (type: string): FormData => ({
    content_type: type, item_index: 0, heading: '', subtitle: '', text: '',
    paragraphs: [], name: '', role: '', bio: '', image: '', mission: '', vision: '', year: ''
})

const AboutContentForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditing = Boolean(id)
    const [formData, setFormData] = useState<FormData>(() => getInitialForm('hero'))
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!isEditing) return
        const fetchItem = async () => {
            try {
                setLoading(true)
                const item = await AboutServices.getById(id!)
                const a = item.attributes
                setFormData({
                    content_type: a.content_type, item_index: a.item_index, heading: a.heading || '',
                    subtitle: a.subtitle || '', text: a.text || '', paragraphs: a.paragraphs || [],
                    name: a.name || '', role: a.role || '', bio: a.bio || '', image: a.image || '',
                    mission: a.mission || '', vision: a.vision || '', year: a.year || '',
                })
            } catch { setError('Failed to load content') } finally { setLoading(false) }
        }
        fetchItem()
    }, [id, isEditing])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setSaving(true)
            if (isEditing) await AboutServices.update(id!, formData)
            else await AboutServices.create(formData)
            navigate('/admin/about')
        } catch { setError(isEditing ? 'Failed to update' : 'Failed to create') } finally { setSaving(false) }
    }

    const handleChange = (field: keyof FormData, value: string | number | string[]) => {
        if (field === 'content_type') setFormData(getInitialForm(value as string))
        else setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleParagraphsChange = (v: string) => handleChange('paragraphs', v.split('\n').filter(p => p.trim()))

    const handleImageDelete = async () => {
        if (isEditing && id) try { await AboutServices.deleteImage(id); handleChange('image', '') } catch { setError('Failed to delete image') }
        else handleChange('image', '')
    }

    const type = formData.content_type
    const isHero = type === 'hero', isTeamMember = type === 'team_member'
    const isValue = type === 'value', isTimeline = type === 'timeline_event'
    const hasRightContent = isHero || isTeamMember
    const props = { formData, onChange: handleChange, onParagraphsChange: handleParagraphsChange, onImageDelete: handleImageDelete }

    if (loading) return <div className="h-full flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" /></div>

    return (
        <div className="h-full flex flex-col">
            <PageHeader title={isEditing ? 'Edit About Content' : 'Add About Content'} subtitle={isEditing ? 'Update details' : 'Create new'} buttonLabel="Back" buttonIcon={<ArrowLeft className="w-4 h-4" />} onButtonClick={() => navigate('/admin/about')} />
            <div className="flex-1 overflow-auto mt-2">
                {error && <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border">{error}</div>}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-6">
                    <div className={`grid grid-cols-1 ${hasRightContent ? 'lg:grid-cols-2' : ''} gap-6`}>
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Content Type *</label>
                                    <select value={formData.content_type} onChange={(e) => handleChange('content_type', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500" required>
                                        {CONTENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Index *</label>
                                    <input type="number" value={formData.item_index} onChange={(e) => handleChange('item_index', parseInt(e.target.value) || 0)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500" required />
                                </div>
                            </div>
                            {isHero && <HeroFields {...props} />}
                            {isTeamMember && <TeamMemberFields {...props} />}
                            {isValue && <ValueFields {...props} />}
                            {isTimeline && <TimelineFields {...props} />}
                        </div>
                        {hasRightContent && <div className="space-y-6">
                            {(isHero || isTeamMember) && <ImageSection {...props} isTeamMember={isTeamMember} />}
                            {isHero && <ParagraphsSection {...props} />}
                        </div>}
                    </div>
                    <div className="flex justify-end space-x-3 pt-6 border-t">
                        <button type="button" onClick={() => navigate('/admin/about')} className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
                        <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 flex items-center space-x-2">
                            {saving ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Saving...</span></>
                                : <><Check className="w-4 h-4" /><span>{isEditing ? 'Update' : 'Create'}</span></>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AboutContentForm
