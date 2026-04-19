import { Pencil, Trash2 } from 'lucide-react'
import { AboutContent } from '@/services/about-services'

const CONTENT_TYPES: Record<string, string> = {
    hero: 'Hero',
    team_member: 'Team Member',
    value: 'Value',
    timeline_event: 'Timeline Event',
}

interface Props {
    items: AboutContent[]
    loading: boolean
    onEdit: (item: AboutContent) => void
    onDelete: (id: string) => void
}

export const AboutContentTable = ({ items, loading, onEdit, onDelete }: Props) => {
    if (loading && items.length === 0) {
        return <div className="p-8 text-center text-gray-500">Loading...</div>
    }

    if (items.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                No content items found. Click "Add Content" to create one.
            </div>
        )
    }

    const getDisplayTitle = (item: AboutContent) => {
        const { content_type, heading, subtitle, name, text } = item.attributes
        if (content_type === 'team_member') return name || 'Unnamed'
        if (content_type === 'hero') return heading || 'Hero Section'
        if (content_type === 'value') return text || heading || 'Value'
        if (content_type === 'timeline_event') return `${item.attributes.year || 'N/A'} - ${text || heading || 'Event'}`
        return heading || subtitle || '--'
    }

    return (
        <table className="w-full">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title/Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Index</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                                {CONTENT_TYPES[item?.attributes?.content_type] || item?.attributes?.content_type}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{getDisplayTitle(item)}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                            {item.attributes.role || item.attributes.subtitle || item.attributes.year || item.attributes.text || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item?.attributes?.item_index}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                            <button onClick={() => onEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                <Pencil className="w-4 h-4 text-amber-600" />
                            </button>
                            <button onClick={() => onDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default AboutContentTable
