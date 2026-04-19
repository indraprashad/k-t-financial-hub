import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import IconPicker from '@/common/ui/icon-picker'
import { TrustBadge } from '@/services/home-service'

interface Props {
    badges: TrustBadge[]
    onChange: (badges: TrustBadge[]) => void
}

export const TrustBadgeField = ({ badges, onChange }: Props) => {
    const [newBadge, setNewBadge] = useState('')
    const [newBadgeIcon, setNewBadgeIcon] = useState('')

    const addBadge = () => {
        if (newBadge.trim()) {
            const badgeExists = badges.some(badge => badge.text === newBadge.trim())
            if (!badgeExists) {
                const newTrustBadge: TrustBadge = {
                    text: newBadge.trim(),
                    icon: newBadgeIcon || undefined
                }
                onChange([...badges, newTrustBadge])
                setNewBadge('')
                setNewBadgeIcon('')
            }
        }
    }

    const removeBadge = (index: number) => {
        onChange(badges.filter((_, i) => i !== index))
    }

    const updateBadgeIcon = (index: number, icon: string) => {
        const updatedBadges = [...badges]
        updatedBadges[index] = { ...updatedBadges[index], icon: icon || undefined }
        onChange(updatedBadges)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addBadge()
        }
    }

    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-3">Trust Badges</label>

            <div className="space-y-2 mb-3">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newBadge}
                        onChange={(e) => setNewBadge(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add badge text (e.g., ISO Certified)"
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                    <button
                        type="button"
                        onClick={addBadge}
                        disabled={!newBadge.trim()}
                        className="px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                <div className="w-48">
                    <label className="block text-xs text-amber-600 mb-1">Icon for new badge (optional)</label>
                    <IconPicker
                        value={newBadgeIcon || ''}
                        onChange={(icon) => setNewBadgeIcon(icon)}
                        placeholder="Select icon"
                    />
                </div>
            </div>

            {badges.length > 0 && (
                <div className="space-y-2">
                    {badges.map((badge, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span
                                className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full flex-1"
                            >
                                {badge.text}
                                <button
                                    type="button"
                                    onClick={() => removeBadge(index)}
                                    className="p-0.5 hover:bg-amber-200 rounded-full transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                            <div className="w-32">
                                <IconPicker
                                    value={badge.icon || ''}
                                    onChange={(icon) => updateBadgeIcon(index, icon)}
                                    placeholder="Icon"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {badges.length === 0 && (
                <p className="text-sm text-gray-500 italic">No trust badges added yet</p>
            )}
        </div>
    )
}

export default TrustBadgeField
