import React from 'react'
import { getStats, isAdmin } from '@/app/actions'

const page = async () => {
    const stats = await getStats();
    return (
        <div className='space-y-5'>
            <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
            <div className='grid grid-cols-2 gap-4 '>
                <div className='bg-gray-100 p-4 rounded-lg shadow-xl'>
                    <h2 className='text-xl font-semibold'>Total Users</h2>
                    <p className='text-3xl font-bold'>{stats.totalUsers}</p>
                </div>
                <div className='bg-gray-100 p-4 rounded-lg shadow-xl'>
                    <h2 className='text-xl font-semibold'>Total Articles</h2>
                    <p className='text-3xl font-bold'>{stats.totalArticles}</p>
                </div>
                <div className='bg-gray-100 p-4 rounded-lg shadow-xl'>
                    <h2 className='text-xl font-semibold'>Featured Articles</h2>
                    <p className='text-3xl font-bold'>{stats.featuredArticles}</p>
                </div>
            </div>
        </div>
    )
}

export default page