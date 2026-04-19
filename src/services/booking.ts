import baseApi from '../utils/ApiUtils';

export interface ConsultationBookingAttributes {
    name: string;
    email: string;
    phone: string;
    service: string;
    message?: string;
    preferred_date: string;
    created_at: string;
    updated_at: string;
}

export interface ConsultationBooking {
    id: string;
    type: 'booking';
    attributes: ConsultationBookingAttributes;
}

export interface ConsultationBookingInput {
    name: string;
    email: string;
    phone: string;
    service: string;
    message?: string;
    preferred_date: string;
}

export interface ConsultationBookingListResponse {
    data: ConsultationBooking[];
    meta: {
        previous: string | null;
        current: number;
        next_page: string | null;
        last_page: number;
        total: number;
    };
}

const BASE_BOOKINGS = '/consultation-bookings/';

export const bookingApi = {
    getAll: (params?: {
        service?: string;
        preferred_date?: string;
        ordering?: string;
        page?: number;
        per_page?: number;
    }) => baseApi(BASE_BOOKINGS, 'GET', params || {}, null, 'json', {})
        .then(r => r.data as ConsultationBookingListResponse),

    getById: (id: string) => baseApi(`${BASE_BOOKINGS}${id}/`, 'GET', {}, null, 'json', {})
        .then(r => r.data as ConsultationBooking),

    create: (data: ConsultationBookingInput) => baseApi(BASE_BOOKINGS, 'POST', {}, data, 'json', {})
        .then(r => r.data as ConsultationBooking),

    update: (id: string, data: Partial<ConsultationBookingInput>) =>
        baseApi(`${BASE_BOOKINGS}${id}/`, 'PATCH', {}, data, 'json', {})
            .then(r => r.data as ConsultationBooking),

    delete: (id: string) =>
        baseApi(`${BASE_BOOKINGS}${id}/`, 'DELETE', {}, null, 'json', {})
            .then(r => r.data),
};

export default bookingApi;