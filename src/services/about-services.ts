import baseApi from '../utils/ApiUtils';

const API_BASE = '/about-content/';

export interface AboutContentAttributes {
    content_type: 'hero' | 'team_member' | 'value' | 'timeline_event';
    heading?: string;
    subtitle?: string;
    text?: string;
    paragraphs?: string[];
    name?: string;
    role?: string;
    bio?: string;
    image?: string;
    mission?: string;
    vision?: string;
    year?: string;
    item_index: number;
    created_at: string;
    updated_at: string;
}

export interface AboutContent {
    id: string;
    type: 'about';
    attributes: AboutContentAttributes;
}

export interface AboutContentResponse {
    data: AboutContent[];
    meta: {
        total: number;
        last_page: number;
        current: number;
        next_page: number | null;
        previous: number | null;
    };
}

export const AboutServices = {
    getAll: (params?: { page?: number; per_page?: number }) =>
        baseApi(API_BASE, 'GET', params || {}, null, 'json', {})
            .then(r => ({
                data: r.data.data as AboutContent[],
                meta: r.data.meta
            }) as AboutContentResponse),
    getById: (id: string) => baseApi(`${API_BASE}${id}/`, 'GET', {}, null, 'json', {}).then(r => (r.data.data || r.data) as AboutContent),
    create: (data: unknown) => baseApi(API_BASE, 'POST', {}, data, 'json', {}).then(r => r.data),
    update: (id: string, data: unknown) => baseApi(`${API_BASE}${id}/`, 'PATCH', {}, data, 'json', {}).then(r => r.data),
    delete: (id: string) => baseApi(`${API_BASE}${id}/`, 'DELETE', {}, null, 'json', {}).then(r => r.data),
    deleteImage: (id: string) => baseApi(`${API_BASE}${id}/delete_image/`, 'DELETE', {}, null, 'json', {}).then(r => r.data),
};