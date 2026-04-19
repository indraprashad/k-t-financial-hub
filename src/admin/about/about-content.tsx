import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import PageHeader from "@/common/page-header";
import { AboutServices, AboutContent } from '@/services/about-services';
import AboutContentTable from './components/AboutContentTable'
import { Pagination } from '@/common/pagination'

const AboutContentAdmin = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState<AboutContent[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [meta, setMeta] = useState({ total: 0, last_page: 1 })

    const fetchItems = async () => {
        try {
            setLoading(true)
            const response = await AboutServices.getAll({ page, per_page: perPage })
            setItems(response?.data || [])
            setMeta(response?.meta || { total: 0, last_page: 1 })
        } catch (err) {
            setError('Failed to load about content')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchItems() }, [page, perPage])

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return
        try {
            setLoading(true)
            await AboutServices.delete(id)
            fetchItems()
        } catch (err) {
            setError('Failed to delete item')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <PageHeader
                title="About Content"
                subtitle="Manage your about page sections"
                buttonLabel="Add Content"
                buttonIcon={<Plus className="w-4 h-4" />}
                onButtonClick={() => navigate('/admin/about/add')}
            />

            {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
            )}

            <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
                <AboutContentTable items={items} loading={loading} onEdit={(item) => navigate(`/admin/about/${item.id}/edit`)} onDelete={handleDelete} />
                <Pagination
                    page={page}
                    perPage={perPage}
                    total={meta.total}
                    onPageChange={setPage}
                    onPerPageChange={(newPerPage) => {
                        setPerPage(newPerPage);
                        setPage(1);
                    }}
                />
            </div>

        </div>
    )
}

export default AboutContentAdmin
