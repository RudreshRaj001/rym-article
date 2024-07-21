import { Category } from '@prisma/client';
import { Libre_Caslon_Text, Ubuntu } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
const titleFont = Libre_Caslon_Text({ subsets: ["latin"], weight: "400" });
const titleFontBold = Libre_Caslon_Text({ subsets: ["latin"], weight: "700" });
export const ubuntuFont = Ubuntu({ subsets: ["latin"], weight: "400" });

const ArticleCard = (
    { article, order }: {

        article: {
            id: string;
            title: string;
            subheading: string;
            content: string;
            banner: string;
            category: Category;
            tags: string[];
            authorId: string;
            createdAt: Date;
            updatedAt: Date;
        },
        order: number
    }
) => {
    return (
        <>
            <Link className='lg:flex flex-col gap-5 hidden'
                href={`/article/${article.id}`}
            >
                <div className={`w-full h-96 bg-[#29303C] text-white rounded-md flex 
            ${order % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}
            justify-between 
                shadow-sm hover:opacity-[0.98]
            `}>
                    <div className='w-1/2 p-10 flex flex-col gap-3'>
                        <h1 className={`text-3xl 
                        ${titleFontBold.className}
                        underline
                    `}>{article.title}</h1>
                        <p className={` ${titleFontBold.className}`}>{article.subheading}</p>
                        <p className={`mt-auto w-full py-1 px-2
                                ${ubuntuFont.className} text-sm
                            `}>
                            Published : {" "}
                            <span>
                                {new Date(article.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                        </p>
                    </div>
                    <div className='w-1/2 flex items-center justify-center rounded-sm '>
                        <Image src={article.banner} alt='banner'
                            width={700}
                            height={400}
                            className={` max-w-full max-h-full  object-cover
                            ${order % 2 === 0 ? 'rounded-r-md' : 'rounded-l-md'}
                            `}
                        />
                    </div>
                </div>
            </Link>
            <Link className='lg:w-1/3 w-full  bg-[#29303C] text-white rounded-md flex flex-col hover:shadow-md transition duration-200 ease-in-out cursor-pointer hover:scale-[1.02]'
                href={`/article/${article.id}`}
            >
                <div className='flex items-center justify-center rounded-sm'>
                    <Image src={article.banner} alt='banner'
                        width={900}
                        height={400}
                        className='rounded-t-md max-w-full max-h-full object-contain'
                    />
                </div>
                <div className='p-5 flex flex-col gap-3'>
                    <h1 className={`text-2xl ${titleFontBold.className} underline line-clamp-6`}>{article.title}</h1>
                    <p className={` ${ubuntuFont.className} line-clamp-6`}>{article.subheading}</p>
                </div>
                <p className={`mt-auto w-full p-5
                        ${ubuntuFont.className} text-sm 
                    `}>
                    Published : {" "}
                    <span>
                        {new Date(article.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                </p>
            </Link>

        </>
    )
}

export default ArticleCard