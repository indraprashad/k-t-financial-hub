import { Home, User, BookOpenCheck, HandPlatter, Newspaper, LayoutList, UserPen, Handshake, Folder } from 'lucide-react'

export const menuItems = [
    {
        name: 'home',
        path: '/admin/home',
        icon: Home
    },
    {
        name: 'about',
        path: '/admin/about',
        icon: User
    },
    {
        name: 'services',
        path: '/admin/services',
        icon: HandPlatter
    },
    {
        name: 'service-categories',
        path: '/admin/service-categories',
        icon: Folder
    },
    {
        name: 'blogs',
        path: '/admin/blogs',
        icon: Newspaper
    },
    {
        name: 'category',
        path: '/admin/category',
        icon: LayoutList
    },
    {
        name: 'contact',
        path: '/admin/contact',
        icon: UserPen
    },
    {
        name: 'booking',
        path: '/admin/booking',
        icon: BookOpenCheck
    },
    {
        name: 'business',
        path: '/admin/business',
        icon: Handshake
    }
]
