"use client"
import React, { useEffect } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Heart, Menu, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpWideNarrow, Home, Search, SquareStack, Star } from 'lucide-react';
const Sidebar = () => {
    const sideLinks = [
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
        <div className={`lg:hidden flex items-center`} >
            <Sheet>
                <SheetTrigger>
                    <Menu />
                </SheetTrigger>
                <SheetContent side={"left"} className=''>
                    <SheetClose asChild >
                        <Link
                            href={'/'}
                            className={`font-bold text-xl 
                            flex justify-center items-center
                            `}
                        >
                            ArticleAlley
                        </Link>
                    </SheetClose>

                    <div className={`flex flex-col gap-3 mt-10  `}>
                        {sideLinks.map((link, index) => {
                            const isActive = pathname === link.href;
                            return (
                                <SheetClose asChild key={index}>
                                    <Link href={link.href}
                                        className={`text-lg  py-2 rounded-lg px-3
                                        ${isActive ? 'bg-[#29303C] text-white' : 'bg-secondary'}
                                        active:bg-[#29303C] active:text-white
                                        `}
                                    >{link.name}</Link>
                                </SheetClose>
                            )
                        })}

                    </div>

                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Sidebar