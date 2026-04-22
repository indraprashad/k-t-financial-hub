import React from 'react';

export const routes = [
    {
        path: 'home',
        component: React.lazy(() => import('../view/home/home'))
    },
    {
        path: 'booking',
        component: React.lazy(() => import('../view/book/book-consultation'))
    },
    {
        path: 'blogs',
        component: React.lazy(() => import('../view/blogs/all-blogs'))
    },
    {
        path: 'blog/:id',
        component: React.lazy(() => import('../view/blogs/blog-detail'))
    },
    {
        path: 'contact',
        component: React.lazy(() => import('../common/ui/contact-form'))
    },
    {
        path: 'services',
        component: React.lazy(() => import('../view/services/all-services'))
    },
    {
        path: 'service/:id',
        component: React.lazy(() => import('../view/services/service-detail'))
    },
    {
        path: 'privacy-policy',
        component: React.lazy(() => import('../view/legal/privacy-policy'))
    },
    {
        path: 'terms-of-service',
        component: React.lazy(() => import('../view/legal/terms-of-service'))
    },
]
