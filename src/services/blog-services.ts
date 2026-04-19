import baseApi from '../utils/ApiUtils';

export interface BlogCategory {
    id: string;
    type: 'blog_category';
    attributes: {
        name: string;
        slug: string;
        description?: string;
        created_at: string;
        updated_at: string;
    };
}

export interface BlogPostAttributes {
    title: string;
    slug: string;
    excerpt?: string;
    body?: string;
    image?: string;
    published: boolean;
    published_at?: string;
    featured: boolean;
    category?: number;
    category_name?: string;
    created_at: string;
    updated_at: string;
}

export interface BlogPost {
    id: string;
    type: 'blog';
    attributes: BlogPostAttributes;
}

export interface BlogPostListResponse {
    data: BlogPost[];
    meta: {
        page: number;
        per_page: number;
        total: number;
        total_pages: number;
    };
}

export interface BlogPostInput {
    title: string;
    excerpt?: string;
    body?: string;
    image?: string;
    published?: boolean;
    published_at?: string;
    featured?: boolean;
    category_id?: string | null;
}

const BASE_POSTS = '/blog-posts';
const BASE_CATEGORIES = '/blog-categories';

export const blogPostApi = {
    getAll: (params?: {
        category?: string;
        published?: boolean;
        featured?: boolean;
        category_name?: string;
        search?: string;
        ordering?: string;
        page?: number;
        per_page?: number;
    }) => baseApi(`${BASE_POSTS}/`, 'GET', params || {}, null, 'json', {})
        .then(r => r.data as BlogPostListResponse),

    getById: (id: string) => baseApi(`${BASE_POSTS}/${id}/`, 'GET', {}, null, 'json', {})
        .then(r => (r.data.data || r.data) as BlogPost),

    create: (data: BlogPostInput) => baseApi(`${BASE_POSTS}/`, 'POST', {}, data, 'json', {})
        .then(r => r.data as BlogPost),

    update: (id: string, data: Partial<BlogPostInput>) =>
        baseApi(`${BASE_POSTS}/${id}/`, 'PATCH', {}, data, 'json', {})
            .then(r => r.data as BlogPost),

    delete: (id: string) =>
        baseApi(`${BASE_POSTS}/${id}/`, 'DELETE', {}, null, 'json', {})
            .then(r => r.data),
};


export interface BlogCategoryListResponse {
    data: BlogCategory[];
    meta: {
        page: number;
        per_page: number;
        total: number;
        total_pages: number;
    };
}

export const blogCategoryApi = {
    getAll: (params?: { page?: number; per_page?: number; ordering?: string }) =>
        baseApi(`${BASE_CATEGORIES}/`, 'GET', params || {}, null, 'json', {})
            .then(r => r.data as BlogCategoryListResponse),

    getById: (id: string) => baseApi(`${BASE_CATEGORIES}/${id}/`, 'GET', {}, null, 'json', {})
        .then(r => (r.data.data || r.data) as BlogCategory),

    create: (data: { name: string; description?: string }) =>
        baseApi(`${BASE_CATEGORIES}/`, 'POST', {}, data, 'json', {})
            .then(r => r.data as BlogCategory),

    update: (id: string, data: Partial<{ name: string; description: string }>) =>
        baseApi(`${BASE_CATEGORIES}/${id}/`, 'PATCH', {}, data, 'json', {})
            .then(r => r.data as BlogCategory),

    delete: (id: string) =>
        baseApi(`${BASE_CATEGORIES}/${id}/`, 'DELETE', {}, null, 'json', {})
            .then(r => r.data),
};

export default { posts: blogPostApi, categories: blogCategoryApi };