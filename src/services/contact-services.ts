import baseApi from '../utils/ApiUtils';

export interface ContactSubmissionAttributes {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    created_at: string;
    updated_at: string;
}

export interface ContactSubmission {
    id: string;
    type: 'contact';
    attributes: ContactSubmissionAttributes;
}

export interface ContactSubmissionInput {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

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

const BASE_CONTACT = '/contact-submissions/';
const BASE_BUSINESS = '/business-contact/';


export const contactSubmissionApi = {
    getAll: (params?: { subject?: string; ordering?: string; page?: number; per_page?: number }) =>
        baseApi(BASE_CONTACT, 'GET', params || {}, null, 'json', {})
            .then(r => (r.data.data || r.data) as ContactSubmission[]),

    getById: (id: string) =>
        baseApi(`${BASE_CONTACT}${id}/`, 'GET', {}, null, 'json', {})
            .then(r => (r.data.data || r.data) as ContactSubmission),

    create: (data: ContactSubmissionInput) =>
        baseApi(BASE_CONTACT, 'POST', {}, data, 'json', {})
            .then(r => r.data as ContactSubmission),

    update: (id: string, data: Partial<ContactSubmissionInput>) =>
        baseApi(`${BASE_CONTACT}${id}/`, 'PATCH', {}, data, 'json', {})
            .then(r => r.data as ContactSubmission),

    delete: (id: string) =>
        baseApi(`${BASE_CONTACT}${id}/`, 'DELETE', {}, null, 'json', {})
            .then(r => r.data),
};


export const businessContactApi = {
    getAll: (params?: { content_type?: string; item_index?: number; ordering?: string }) =>
        baseApi(BASE_BUSINESS, 'GET', params || {}, null, 'json', {})
            .then(r => (r.data.data || r.data) as BusinessContact[]),

    getById: (id: string) =>
        baseApi(`${BASE_BUSINESS}${id}/`, 'GET', {}, null, 'json', {})
            .then(r => (r.data.data || r.data) as BusinessContact),

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

export default { submissions: contactSubmissionApi, business: businessContactApi };