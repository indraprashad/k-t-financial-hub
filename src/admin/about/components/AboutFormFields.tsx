import ImageUpload from '@/common/ui/image-upload'

interface FormData {
    content_type: string
    item_index: number
    heading?: string
    subtitle?: string
    text?: string
    paragraphs?: string[]
    name?: string
    role?: string
    bio?: string
    image?: string
    mission?: string
    vision?: string
    year?: string
}

interface Props {
    formData: FormData
    onChange: (field: keyof FormData, value: string | number | string[]) => void
    onParagraphsChange: (value: string) => void
    onImageDelete: () => Promise<void>
}

const Input = ({ label, value, onChange, required, type = 'text', rows }: any) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && ' *'}</label>
        {rows ? (
            <textarea
                value={value || ''}
                onChange={onChange}
                rows={rows}
                required={required}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
            />
        ) : (
            <input
                type={type}
                value={value || ''}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
        )}
    </div>
)

const Section = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4">{children}</div>
)

export const TypeSelector = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <Section>
        <Input
            label="Content Type"
            value={value}
            onChange={(e: any) => onChange(e.target.value)}
            required
        />
    </Section>
)

export const HeroFields = ({ formData, onChange }: Props) => (
    <Section>
        <Input label="Heading" value={formData.heading} onChange={(e: any) => onChange('heading', e.target.value)} />
        <Input label="Subtitle" value={formData.subtitle} onChange={(e: any) => onChange('subtitle', e.target.value)} />
        <Input label="Mission" value={formData.mission} onChange={(e: any) => onChange('mission', e.target.value)} rows={3} />
        <Input label="Vision" value={formData.vision} onChange={(e: any) => onChange('vision', e.target.value)} rows={3} />
    </Section>
)

export const TeamMemberFields = ({ formData, onChange }: Props) => (
    <Section>
        <Input label="Name" value={formData.name} onChange={(e: any) => onChange('name', e.target.value)} required />
        <Input label="Role" value={formData.role} onChange={(e: any) => onChange('role', e.target.value)} required />
        <Input label="Bio" value={formData.bio} onChange={(e: any) => onChange('bio', e.target.value)} rows={4} />
    </Section>
)

export const ValueFields = ({ formData, onChange }: Props) => (
    <Section>
        <div className="grid grid-cols-2 gap-4">
            <Input label="Heading" value={formData.heading} onChange={(e: any) => onChange('heading', e.target.value)} />
            <Input label="Text" value={formData.text} onChange={(e: any) => onChange('text', e.target.value)} required />
        </div>
    </Section>
)

export const TimelineFields = ({ formData, onChange }: Props) => (
    <Section>
        <div className="grid grid-cols-2 gap-4">
            <Input label="Year" value={formData.year} onChange={(e: any) => onChange('year', e.target.value)} required />
            <Input label="Heading" value={formData.heading} onChange={(e: any) => onChange('heading', e.target.value)} />
        </div>
        <Input label="Text" value={formData.text} onChange={(e: any) => onChange('text', e.target.value)} required rows={4} />
    </Section>
)

export const ImageSection = ({ formData, onChange, onImageDelete, isTeamMember }: Props & { isTeamMember: boolean }) => (
    <div className="space-y-6">
        <ImageUpload
            value={formData.image || ''}
            onChange={(base64) => onChange('image', base64)}
            onDelete={onImageDelete}
            label={isTeamMember ? "Member Photo" : "Hero Image"}
        />
    </div>
)

export const ParagraphsSection = ({ formData, onParagraphsChange }: Props) => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-1">Paragraphs (one per line)</label>
        <textarea
            value={(formData.paragraphs || []).join('\n')}
            onChange={(e) => onParagraphsChange(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
        />
    </div>
)
