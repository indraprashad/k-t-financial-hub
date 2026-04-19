import { Pencil, Trash2 } from 'lucide-react'
import { HomeContent } from '@/services/home-service'

const CONTENT_TYPES: Record<string, string> = {
    hero: 'Hero',
    stat: 'Stat',
}

interface Props {
    items: HomeContent[]
    loading: boolean
    onEdit: (item: HomeContent) => void
    onDelete: (id: string) => void
}

export const HomeContentTable = ({ items, loading, onEdit, onDelete }: Props) => {
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

    return (
        <table className="w-full">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heading</th>
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
                        <td className="px-6 py-4 text-sm text-gray-900">{item?.attributes?.title || item.attributes.label || "--"}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item?.attributes?.heading || item?.attributes?.value || '-'}</td>
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

export default HomeContentTable
