import React from 'react'

export const protectedRoutes = [
  {
    path: 'home',
    component: React.lazy(() => import('../admin/home/home-content'))
  },
  {
    path: 'home/add',
    component: React.lazy(() => import('../admin/home/home-content-form'))
  },
  {
    path: 'home/:id/edit',
    component: React.lazy(() => import('../admin/home/home-content-form'))
  },
  {
    path: 'profile', 
    component: React.lazy(() => import('../admin/profile/profile'))
  },
  {
    path: 'about',
    component: React.lazy(() => import('../admin/about/about-content'))
  },
  {
    path: 'about/add',
    component: React.lazy(() => import('../admin/about/about-content-form'))
  },
  {
    path: 'about/:id/edit',
    component: React.lazy(() => import('../admin/about/about-content-form'))
  },
  {
    path: 'services',
    component: React.lazy(() => import('../admin/services/services'))
  },
  {
    path: 'services/new',
    component: React.lazy(() => import('../admin/services/service-form'))
  },
  {
    path: 'services/edit/:id',
    component: React.lazy(() => import('../admin/services/service-form'))
  },
  {
    path: 'service-categories',
    component: React.lazy(() => import('../admin/services/service-categories'))
  },
  {
    path: 'service-categories/new',
    component: React.lazy(() => import('../admin/services/service-category-form'))
  },
  {
    path: 'service-categories/edit/:id',
    component: React.lazy(() => import('../admin/services/service-category-form'))
  },
  {
    path: 'contact',
    component: React.lazy(() => import('../admin/contact/contact.tsx'))
  },
  {
    path: 'contact/:id',
    component: React.lazy(() => import('../admin/contact/contact-detail.tsx'))
  },
  {
    path: 'booking',
    component: React.lazy(() => import('../admin/bookings/consultant-booking.tsx'))
  },
  {
    path: 'booking/:id',
    component: React.lazy(() => import('../admin/bookings/booking-detail.tsx'))
  },
  {
    path: 'category',
    component: React.lazy(() => import('../admin/category/blog-category.tsx'))
  },
  {
    path: 'category/add',
    component: React.lazy(() => import('../admin/category/blog-category-form.tsx'))
  },
  {
    path: 'category/:id',
    component: React.lazy(() => import('../admin/category/blog-category.tsx'))
  },
  {
    path: 'category/:id/edit',
    component: React.lazy(() => import('../admin/category/blog-category-form.tsx'))
  },
  {
    path: 'blogs',
    component: React.lazy(() => import('../admin/blogs/blogs'))
  },
  {
    path: 'blogs/new',
    component: React.lazy(() => import('../admin/blogs/blog-form.tsx'))
  },
  {
    path: 'blogs/edit/:id',
    component: React.lazy(() => import('../admin/blogs/blog-form.tsx'))
  },
  {
    path: 'business',
    component: React.lazy(() => import('../admin/business/business-contact.tsx'))
  },
  {
    path: 'business/add',
    component: React.lazy(() => import('../admin/business/business-contact-form.tsx'))
  },
  {
    path: 'business/edit/:id',
    component: React.lazy(() => import('../admin/business/business-contact-form.tsx'))
  },
  {
    path: 'profile',
    component: React.lazy(() => import('../admin/profile/profile'))
  }
]
