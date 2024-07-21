import Categories from '@/components/Categories';
import React from 'react'

export default function CategoriesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='py-10'>
            <Categories />
            {children}
        </div>
    )
}