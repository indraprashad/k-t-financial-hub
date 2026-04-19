import baseApi from '../utils/ApiUtils';

export interface ServiceCategoryAttributes {
    name: string;
    slug: string;
    description?: string;
    created_at: string;
    updated_at: string;
}

export interface ServiceCategory {
    id: string;
    type: 'service_category';
    attributes: ServiceCategoryAttributes;
}

export interface ServiceCategoryListResponse {
    data: ServiceCategory[];
    meta?: {
        page: number;
        per_page: number;
        total: number;
        total_pages: number;
    };
}

export interface ServiceCategoryInput {
    name?: string;
    slug?: string;
    description?: string;
}

const BASE_URL = '/service-categories/';

export const serviceCategoryApi = {
    getAll: (params?: { page?: number; per_page?: number; ordering?: string }) =>
        baseApi(BASE_URL, 'GET', params || {}, null, 'json', {})
            .then(r => (r.data as ServiceCategoryListResponse)),

    getById: (id: string) =>
        baseApi(`${BASE_URL}${id}/`, 'GET', {}, null, 'json', {})
            .then(r => (r.data.data || r.data) as ServiceCategory),

    create: (data: ServiceCategoryInput) =>
        baseApi(BASE_URL, 'POST', {}, data, 'json', {})
            .then(r => r.data as ServiceCategory),

    update: (id: string, data: Partial<ServiceCategoryInput>) =>
        baseApi(`${BASE_URL}${id}/`, 'PATCH', {}, data, 'json', {})
            .then(r => r.data as ServiceCategory),

    delete: (id: string) =>
        baseApi(`${BASE_URL}${id}/`, 'DELETE', {}, null, 'json', {})
            .then(r => r.data),
};

export default serviceCategoryApi;
