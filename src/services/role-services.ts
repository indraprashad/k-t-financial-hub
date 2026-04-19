import baseApi from '../utils/ApiUtils';

export interface RoleAttributes {
    name: string;
    description?: string;
    permissions: string[];
    created_at: string;
    updated_at: string;
}

export interface Role {
    id: string;
    type: 'role';
    attributes: RoleAttributes;
}

export interface UserRoleAttributes {
    user: string;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface UserRole {
    id: string;
    type: 'user_role';
    attributes: UserRoleAttributes;
}

export interface InvitationAttributes {
    email: string;
    role: string;
    invited_by?: string;
    token: string;
    is_accepted: boolean;
    accepted_at?: string;
    expires_at: string;
    created_at: string;
}

export interface Invitation {
    id: string;
    type: 'invitation';
    attributes: InvitationAttributes;
}

export interface InvitationInput {
    email: string;
    role_id: string;
}

export interface AcceptInvitationInput {
    token: string;
    username: string;
    password: string;
}

const BASE_ROLES = '/roles';
const BASE_USER_ROLES = '/user-roles';
const BASE_INVITATIONS = '/invitations';

export const roleApi = {
    getAll: (params?: { name?: string; search?: string; ordering?: string }) =>
        baseApi(BASE_ROLES, 'GET', params || {}, null, 'json', {})
            .then(r => r.data as Role[]),

    getById: (id: string) =>
        baseApi(`${BASE_ROLES}/${id}/`, 'GET', {}, null, 'json', {})
            .then(r => r.data as Role),
};

export const userRoleApi = {
    getAll: (params?: { user?: string; role?: string; search?: string; ordering?: string }) =>
        baseApi(BASE_USER_ROLES, 'GET', params || {}, null, 'json', {})
            .then(r => r.data as UserRole[]),

    getById: (id: string) =>
        baseApi(`${BASE_USER_ROLES}/${id}/`, 'GET', {}, null, 'json', {})
            .then(r => r.data as UserRole),

    create: (data: { user_id: string; role_id: string }) =>
        baseApi(BASE_USER_ROLES, 'POST', {}, data, 'json', {})
            .then(r => r.data as UserRole),

    update: (id: string, data: { role_id?: string }) =>
        baseApi(`${BASE_USER_ROLES}/${id}/`, 'PATCH', {}, data, 'json', {})
            .then(r => r.data as UserRole),

    delete: (id: string) =>
        baseApi(`${BASE_USER_ROLES}/${id}/`, 'DELETE', {}, null, 'json', {})
            .then(r => r.data),
};

export const invitationApi = {
    getAll: (params?: { role?: string; is_accepted?: boolean; search?: string; ordering?: string }) =>
        baseApi(BASE_INVITATIONS, 'GET', params || {}, null, 'json', {})
            .then(r => r.data as Invitation[]),

    getById: (id: string) =>
        baseApi(`${BASE_INVITATIONS}/${id}/`, 'GET', {}, null, 'json', {})
            .then(r => r.data as Invitation),

    create: (data: InvitationInput) =>
        baseApi(BASE_INVITATIONS, 'POST', {}, data, 'json', {})
            .then(r => r.data as Invitation),

    update: (id: string, data: Partial<InvitationInput>) =>
        baseApi(`${BASE_INVITATIONS}/${id}/`, 'PATCH', {}, data, 'json', {})
            .then(r => r.data as Invitation),

    delete: (id: string) =>
        baseApi(`${BASE_INVITATIONS}/${id}/`, 'DELETE', {}, null, 'json', {})
            .then(r => r.data),

    verify: (token: string) =>
        baseApi(`${BASE_INVITATIONS}/verify/`, 'GET', { token }, null, 'json', {})
            .then(r => r.data as { valid: boolean; email: string; role: string }),

    accept: (data: AcceptInvitationInput) =>
        baseApi(`${BASE_INVITATIONS}/accept/`, 'POST', {}, data, 'json', {})
            .then(r => r.data as { message: string; user: { id: number; username: string; email: string; role: string } }),
};

export default { roles: roleApi, userRoles: userRoleApi, invitations: invitationApi };
