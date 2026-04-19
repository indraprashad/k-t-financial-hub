import baseApi from '../utils/ApiUtils';

export interface HomeImage {
    id: string;
    type: 'home-image';
    attributes: {
        url: string;
    };
}

export interface TrustBadge {
    text: string;
    icon?: string;
}

export interface HomeContentAttributes {
    content_type: 'hero' | 'stat';
    title?: string;
    heading?: string;
    subtitle?: string;
    description?: string;
    text?: string;
    label?: string;
    value?: string;
    trust_badge?: TrustBadge[];
    icon?: string;
    image?: HomeImage;
    item_index: number;
    created_at: string;
    updated_at: string;
}

export interface HomeContent {
    id: string;
    type: 'home';
    attributes: HomeContentAttributes;
}

export interface HomeContentInput {
    content_type?: 'hero' | 'stat';
    title?: string;
    heading?: string;
    subtitle?: string;
    description?: string;
    text?: string;
    label?: string;
    value?: string;
    trust_badge?: TrustBadge[];
    icon?: string;
    image?: string;
    item_index?: number;
}

const BASE_HOME = '/home-content/';

export interface HomeContentResponse {
    data: HomeContent[];
    meta: {
        total: number;
        last_page: number;
        current: number;
        next_page: number | null;
        previous: number | null;
    };
}

export const homeContentApi = {
    getAll: (params?: { content_type?: string; item_index?: number; ordering?: string; page?: number; per_page?: number }) =>
        baseApi(BASE_HOME, 'GET', params || {}, null, 'json', {})
            .then(r => ({
                data: r.data.data as HomeContent[],
                meta: r.data.meta
            }) as HomeContentResponse),

    getById: (id: string) =>
        baseApi(`${BASE_HOME}${id}/`, 'GET', {}, null, 'json', {})
            .then(r => (r.data.data || r.data) as HomeContent),

    create: (data: HomeContentInput) =>
        baseApi(BASE_HOME, 'POST', {}, data, 'json', {})
            .then(r => r.data as HomeContent),

    update: (id: string, data: Partial<HomeContentInput>) =>
        baseApi(`${BASE_HOME}${id}/`, 'PATCH', {}, data, 'json', {})
            .then(r => r.data as HomeContent),

    delete: (id: string) =>
        baseApi(`${BASE_HOME}${id}/`, 'DELETE', {}, null, 'json', {})
            .then(r => r.data),

    deleteImage: (id: string) =>
        baseApi(`${BASE_HOME}${id}/delete_image/`, 'DELETE', {}, null, 'json', {})
            .then(r => r.data),
};

export default homeContentApi;
