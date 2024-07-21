"use client"
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'

const NewsLetterForm = () => {
    const { toast } = useToast();
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        toast({
            title: 'Subscribed',
            description: 'You have successfully subscribed to our newsletter'
        })
        router.push('/')
    }
    return (
        <form className='flex gap-2'
            onSubmit={handleSubmit}
        >
            <Input placeholder='Enter your email' className='text-black' type='email' />
            <Button>Subscribe</Button>
        </form>
    )
}

export default NewsLetterForm