import baseApi from '../utils/ApiUtils';

export interface ServicesContentAttributes {
    service_id: string;
    category?: string;
    category_name?: string;
    content_type: string;
    title: string;
    description?: string;
    tagline?: string;
    features?: string[];
    image?: string;
    item_index: number;
    created_at: string;
    updated_at: string;
}

export interface ServicesContent {
    id: string;
    type: 'service';
    attributes: ServicesContentAttributes;
}

export interface ServicesListResponse {
    data: ServicesContent[];
    meta?: {
        page: number;
        per_page: number;
        total: number;
        total_pages: number;
    };
}

export interface ServicesContentInput {
    service_id?: string;
    category?: string;
    content_type?: string;
    title?: string;
    description?: string;
    tagline?: string;
    features?: string[];
    image?: string;
    item_index?: number;
}

const BASE_SERVICES = '/services-content/';

export const servicesContentApi = {
    getAll: (params?: { page?: number; per_page?: number; service_id?: string; category?: string; content_type?: string; ordering?: string }) =>
        baseApi(BASE_SERVICES, 'GET', params || {}, null, 'json', {})
            .then(r => (r.data as ServicesListResponse)),

    getById: (serviceId: string) =>
        baseApi(`${BASE_SERVICES}${serviceId}/`, 'GET', {}, null, 'json', {})
            .then(r => (r.data.data || r.data) as ServicesContent),

    create: (data: ServicesContentInput) =>
        baseApi(BASE_SERVICES, 'POST', {}, data, 'json', {})
            .then(r => r.data as ServicesContent),

    update: (serviceId: string, data: Partial<ServicesContentInput>) =>
        baseApi(`${BASE_SERVICES}${serviceId}/`, 'PATCH', {}, data, 'json', {})
            .then(r => r.data as ServicesContent),

    delete: (serviceId: string) =>
        baseApi(`${BASE_SERVICES}${serviceId}/`, 'DELETE', {}, null, 'json', {})
            .then(r => r.data),
};

export default servicesContentApi;