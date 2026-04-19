import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import PageHeader from "@/common/page-header";
import { homeContentApi, HomeContent } from '@/services/home-service';
import HomeContentTable from './components/HomeContentTable'
import { Pagination } from '@/common/pagination'

const HomeContentAdmin = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState<HomeContent[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [meta, setMeta] = useState({ total: 0, last_page: 1 })

    const fetchItems = async () => {
        try {
            setLoading(true)
            const response = await homeContentApi.getAll({ page, per_page: perPage })
            setItems(response?.data || [])
            setMeta(response?.meta || { total: 0, last_page: 1 })
        } catch (err) {
            setError('Failed to load home content')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchItems() }, [page, perPage])

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return
        try {
            setLoading(true)
            await homeContentApi.delete(id)
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
                title="Home Content"
                subtitle="Manage your home page sections"
                buttonLabel="Add Content"
                buttonIcon={<Plus className="w-4 h-4" />}
                onButtonClick={() => navigate('/admin/home/add')}
            />

            {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
            )}

            <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
                <HomeContentTable items={items} loading={loading} onEdit={(item) => navigate(`/admin/home/${item.id}/edit`)} onDelete={handleDelete} />
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

export default HomeContentAdmin