import { getFeaturedArticles } from '@/app/actions'
import OrderArticle from '@/components/admin/OrderArticle';
import React from 'react'

const page = async () => {
    const article = await getFeaturedArticles();
    console.log(article.length);
    return (
        <div>
            order articles
            <OrderArticle articleList={article} />
        </div>
    )
}

export default page


// const article: {
//     id: string;
//     title: string;
//     subheading: string;
//     content: string;
//     banner: string;
//     category: $Enums.Category;
//     tags: string[];
//     authorId: string;
//     createdAt: Date;
//     updatedAt: Date;
// }[]