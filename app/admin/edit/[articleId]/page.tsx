import { getArticleById } from '@/app/actions'
import UpdateForm from '@/components/UpdateForm';
import { Libre_Caslon_Text } from 'next/font/google';
import React from 'react'
const titleFont = Libre_Caslon_Text({ subsets: ["latin"], weight: "700" });
const page = async (
    { params }: { params: { articleId: string } }
) => {
    const article = await getArticleById(params.articleId);
    if (!article) {
        return <div>Article not found</div>
    }
    return (
        <div className=''>
            <h1 className={`text-3xl ${titleFont.className} text-center`}>
                Create Article
            </h1>
            <UpdateForm 
                article={article}
            />
        </div>
    )
}

export default page