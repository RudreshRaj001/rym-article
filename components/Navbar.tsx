import { getName, isAdmin } from '@/app/actions'
import Link from 'next/link'
import React from 'react'
import NavLinks from '@/components/NavLinks'
import { LoginButton } from '@/components/LoginButton'
import { buttonVariants } from './ui/button'
import Sidebar from './Sidebar'

const Navbar = async () => {
    const admin = await isAdmin();
    return (
        <div className={`flex lg:justify-between w-full p-2 items-center border-b-2 
            bg-[#29303C] text-white
             lg:px-20 md:px-10 px-2
        `}>
            <Sidebar />
            <Link
                href='/'
                className='font-bold text-xl ml-2 lg:ml-0'>ArticleAlley</Link>
            <div className='flex gap-5 items-center ml-auto'
            >
                <NavLinks />
                {
                    admin && (
                        <Link href='/admin'
                            className={`${buttonVariants({ variant: 'destructive' })}`}
                        >
                            Admin
                        </Link>
                    )
                }

                <LoginButton />
            </div>
        </div>
    )
}

export default Navbar