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
]
