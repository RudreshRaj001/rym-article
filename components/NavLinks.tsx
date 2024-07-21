"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { Ubuntu } from 'next/font/google'
import { ArrowUpWideNarrow, Home, Search, SquareStack, Star } from 'lucide-react';
export const navigationFont = Ubuntu({ subsets: ["latin"], weight: "400" });

const NavLinks = () => {
    const links = [
        {
            name: 'Home',
            href: '/',
            icon: <Home size={16} />
        },
        {
            name: 'Featured Articles',
            href: '/featured-articles',
            icon: <Star size={16} />
        },
        {
            name: 'Categories',
            href: '/categories',
            icon: <SquareStack size={16} />
        },

    ]

    const pathname = usePathname();

    return (
        <div className={`lg:flex gap-5 items-center hidden 
                    ${navigationFont}
                `}>
            {links.map((link, index) => (
                <div key={index} className="group relative">
                    <Link href={link.href}
                        className={`inline-flex items-center gap-1 hover:underline transform 
                            duration-300 ease-in-out 
                            hover:scale-105 ${pathname === link.href ? 'font-semibold ' : ''}`}
                    >
                        <span className={`transition-all duration-300 ease-in-out transform ${pathname === link.href ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} group-hover:translate-x-0 group-hover:opacity-100`}>{link.icon}</span>
                        {link.name}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default NavLinks