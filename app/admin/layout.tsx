import Navbar from '@/components/Navbar';
import React from 'react'
import { isAdmin, isSuperAdmin } from '@/app/actions';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Cog, LayoutDashboard, Pencil } from 'lucide-react';

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const admin = await isAdmin()
    const superAdmin = await isSuperAdmin();

    if (!admin) {
        return (
            <div>
                <p>Not an admin</p>
            </div>
        )
    }

    return (
        <div className='py-5'>
            <div className='flex gap-3 pb-5 md:flex-row flex-col'>
                <Link href='/admin' className={`${buttonVariants({ variant: 'default' })} bg-green-500 flex items-center gap-2 hover:bg-green-400`}>Admin Dashboard <LayoutDashboard size={20} /></Link>
                {superAdmin && <Link href='/admin/users' className={`${buttonVariants({ variant: 'default' })}`}>Manage Users</Link>}
                <Link href='/admin/articles' className={`${buttonVariants({ variant: 'default' })} flex items-center gap-2 bg-rose-500 hover:bg-rose-400`}>Manage Articles
                    <Cog size={20} />
                </Link>
                <Link href='/admin/post' className={`${buttonVariants({ variant: 'default' })} flex items-center gap-2 bg-yellow-400 text-black hover:bg-yellow-300`}>
                    Create Article
                    <Pencil size={20} />
                </Link>
                {/* <Link href='/admin/featured' className={`${buttonVariants({ variant: 'default' })}`}>Featured Article</Link> */}
            </div>
            {children}
        </div>
    )
}

