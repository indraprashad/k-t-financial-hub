import baseApi from '../utils/ApiUtils';

export interface BusinessContactAttributes {
    content_type: string;
    title?: string;
    address?: string;
    phone?: string;
    email?: string;
    office_hours?: Record<string, string>;
    google_maps_url?: string;
    additional_info?: string;
    item_index: number;
    created_at: string;
    updated_at: string;
}

export interface BusinessContact {
    id: string;
    type: 'business_contact';
    attributes: BusinessContactAttributes;
}

export interface BusinessContactInput {
    content_type?: string;
    title?: string;
    address?: string;
    phone?: string;
    email?: string;
    office_hours?: Record<string, string>;
    google_maps_url?: string;
    additional_info?: string;
    item_index?: number;
}

export interface BusinessContactListResponse {
    data: BusinessContact[];
    meta: {
        previous: string | null;
        current: number;
        next_page: string | null;
        last_page: number;
        total: number;
    };
}

const BASE_BUSINESS = '/business-contact/';

export const businessContactApi = {
    getAll: (params?: { content_type?: string; item_index?: number; ordering?: string; page?: number; per_page?: number }) =>
        baseApi(BASE_BUSINESS, 'GET', params || {}, null, 'json', {})
            .then(r => r.data as BusinessContactListResponse),

    getById: (id: string) =>
        baseApi(`${BASE_BUSINESS}${id}/`, 'GET', {}, null, 'json', {})
            .then(r => r.data as BusinessContact),

    create: (data: BusinessContactInput) =>
        baseApi(BASE_BUSINESS, 'POST', {}, data, 'json', {})
            .then(r => r.data as BusinessContact),

    update: (id: string, data: Partial<BusinessContactInput>) =>
        baseApi(`${BASE_BUSINESS}${id}/`, 'PATCH', {}, data, 'json', {})
            .then(r => r.data as BusinessContact),

    delete: (id: string) =>
        baseApi(`${BASE_BUSINESS}${id}/`, 'DELETE', {}, null, 'json', {})
            .then(r => r.data),
};

export default businessContactApi;