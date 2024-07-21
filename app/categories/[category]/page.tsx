import { getArticlesByCategory } from '@/app/actions';
import ArticleCard from '@/components/ArticleCard';
import PaginationControls from '@/components/PaginationControls';
import { Category } from '@prisma/client'
import React from 'react'

const page = async (
    { params, searchParams }: {
        params: { category: string }, searchParams?: {
            page?: string;
        };
    }
) => {
    
    let categoryValues = Object.values(Category) as string[];

    categoryValues = categoryValues.map(category => category.toLowerCase())

    if (!categoryValues.includes(params.category)) {
        return (
            <div>
                No such category
            </div>
        )
    }
    const currentPage = Number(searchParams?.page) || 1;
    const data = (await getArticlesByCategory(params.category, currentPage));
    const articles = data.articles;
    const totalPages = data.totalPages;


    return (
        <div className='flex flex-col gap-5 mt-5'>
            {
                articles.map((article, index) => (
                    <ArticleCard key={index} article={article} order={index + 1} />
                ))
            }
            <PaginationControls totalPages={totalPages} />
        </div>
    )
}

export default page