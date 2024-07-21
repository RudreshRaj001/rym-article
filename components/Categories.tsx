"use client"
import { Category } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Categories = () => {
    const pathname = usePathname();

    const activeCategory = pathname.split('/')[2] || 'all';

    return (
        <div className='flex flex-wrap gap-5 justify-center py-5'>

            <Link
                href="/categories"
                className={`p-2 rounded-lg border hover:bg-primary hover:text-white hover:shadow-md transition-all ease-in-out duration-300 ${activeCategory === 'all' ? 'bg-primary text-white' : 'bg-secondary'}`}>
                All
            </Link>
            {Object.values(Category).map((category, index) => (
                <Link
                    href={`/categories/${category.toLowerCase()}`}
                    key={index}
                    className={`p-2 rounded-lg border hover:bg-primary hover:text-white hover:shadow-md transition-all ease-in-out duration-300 ${activeCategory === category.toLowerCase() ? 'bg-primary text-white' : 'bg-secondary'}`}>
                    {category}
                </Link>
            ))}
        </div>
    );
}

export default Categories;