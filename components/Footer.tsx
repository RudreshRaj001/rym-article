import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Mountain } from 'lucide-react'
import NewsLetterForm from './NewsLetterForm'

const Footer = () => {
    const links = [
        {
            title: 'About',
            url: '/about'
        },
        {
            title: 'Contact',
            url: '/contact'
        },
        {
            title: 'Top Articles',
            url: '/top-articles'
        },
        {
            title: 'Featured Articles',
            url: '/featured-articles'
        },
    ]
    return (
        <div className='w-full lg:px-20 md:px-10 px-2 py-10'>
            <div className=' rounded-md 
                bg-gradient-to-r from-[#29303C] via-slate-600 to-[#485461]
                lg:p-10 p-5 py-10
                text-white
            '>
                <div className='flex gap-10 lg:flex-row flex-col'>
                    <div className='lg:w-2/5 space-y-5 w-full'>
                        <p className='text-3xl  font-extrabold flex gap-2 items-center '>
                            
                            ArticleAlley</p>
                        <p className='lg:text-justify'>
                            Welcome to ArticleAlley, a platform for reading and writing articles on various topics. Explore diverse content from technology to lifestyle, engage with authors, and contribute your own articles. Dive into knowledge and creativity with ArticleAlley.
                        </p>
                    </div>
                    <div className='lg:w-1/4 w-full flex flex-col space-y-5 lg:text-center'>
                        <p className='text-xl font-bold'>Useful Links</p>

                        <ul className='space-y-2 '>
                            {links.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url} className='hover:underline'>{link.title}</a>
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div className='lg:w-2/5 space-y-5 my-auto'>
                        <p className='font-bold text-xl text-center'>Subscribe to our newsletter</p>
                        <NewsLetterForm />
                        <p className='text-neutral-200 text-sm'>Stay up-to-date with our latest articles and insights.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer