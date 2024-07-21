"use client"
import { Copy, ExternalLink } from 'lucide-react'
import React from 'react'
import { useToast } from './ui/use-toast'
import { Button } from './ui/button'

const CopyArticleLink = (
    { articleId }: { articleId: string }
) => {

    const { toast } = useToast();

    const copyLink = () => {
        const url = `https://example.com/article/${articleId}`
        navigator.clipboard.writeText(url)
        toast({
            title: 'Link Copied',
            description: 'Article link copied to clipboard'
        })
    }

    return (
        <Button
            onClick={copyLink}
            className='bg-[#29303C] ml-auto'
        >
            <span className='mr-2'>Copy Link</span>
            <Copy size={16} />
        </Button>



    )
}

export default CopyArticleLink