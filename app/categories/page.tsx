import React from 'react'
import { getAllArticles } from '../actions';
import ArticleCard from '@/components/ArticleCard';
import PaginationControls from '@/components/PaginationControls';

const page = async (
    { searchParams }: {
        searchParams?: {
            page?: string;
        };
    }
) => {    
    const currentPage = Number(searchParams?.page) || 1;
    const data = await getAllArticles(currentPage);
    const articles = data.articles;
    const totalPages = data.totalPages;

    return (
        <div className='w-full'>
            <div className='flex flex-col gap-5 mt-5'>
                {
                    articles.map((article, index) => (
                        <ArticleCard key={index} article={article} order={index + 1} />
                    ))
                }
                <PaginationControls totalPages={totalPages} />
            </div>
        </div>
    )
}

export default page