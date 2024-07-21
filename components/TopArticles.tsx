import React from 'react'
import { Ubuntu } from 'next/font/google'
import { Libre_Caslon_Text } from 'next/font/google';
import { ChevronRight } from 'lucide-react';
import { getTopArticles } from '@/app/actions';
import Image from 'next/image';
import Link from 'next/link';

const titleFont = Libre_Caslon_Text({ subsets: ["latin"], weight: "700" });
export const ubuntuFont = Ubuntu({ subsets: ["latin"], weight: "400" });
export const ubuntuFontBold = Ubuntu({ subsets: ["latin"], weight: "700" });

const TopArticles = async () => {
    const articles = await getTopArticles();
    const firstArticle = articles[0];
    const restArticles = articles.slice(1);
    return (
        <div className='w-full '>
            <div className='h-1 bg-black w-full' />
            <h1
                className={`text-xl ${titleFont.className} underline flex items-center my-2`}
            >Top Articles
                <ChevronRight />
            </h1>

            <div className='h-[1px] bg-black w-full mb-5' />

            <div className='flex gap-3 md:flex-row flex-col'>
                <Link className='lg:w-1/3 w-full  bg-[#29303C] text-white rounded-md flex flex-col hover:shadow-md transition duration-200 ease-in-out cursor-pointer hover:scale-[1.02]'
                    href={`/article/${firstArticle.id}`}
                >
                    <div className='flex items-center justify-center rounded-sm'>
                        <Image src={firstArticle.banner} alt='banner'
                            width={900}
                            height={400}
                            className='rounded-t-md max-w-full max-h-full object-contain'
                        />
                    </div>
                    <div className='p-5 flex flex-col gap-3'>
                        <h1 className={`text-2xl ${titleFont.className} underline line-clamp-6`}>{firstArticle.title}</h1>
                        <p className={` ${ubuntuFont.className} line-clamp-6`}>{firstArticle.subheading}</p>
                    </div>
                    <p className={`mt-auto w-full p-5
                        ${ubuntuFontBold.className} text-sm 
                    `}>
                        Published : {" "}
                        <span>
                            {new Date(firstArticle.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                    </p>
                </Link>


                <div className='grid xl:grid-cols-3 sm:grid-cols-2  gap-3 lg:w-2/3 w-full'>
                    {restArticles.map((article) => (
                        <Link className='bg-secondary rounded-md flex flex-col 
                            hover:shadow-xl transition duration-200 ease-in-out cursor-pointer hover:scale-[1.02]
                            shadow-md
                        ' key={article.id}
                            href={`/article/${article.id}`}
                        >
                            <div className=' w-full bg-[#29303C] rounded-t-md'>
                                <Image src={article.banner} alt='banner'
                                    width={700}
                                    height={400}
                                    className='rounded-t-md max-w-full max-h-full object-cover '
                                />
                            </div>
                            <div className='p-5 '>
                                <h1 className={`text leading-6 ${titleFont.className} line-clamp-3 underline`}>{article.title}</h1>

                            </div>

                            <p className={`mt-auto w-full text-center py-1 px-2
                                ${ubuntuFont.className} text-sm
                            `}>
                                Published : {" "}
                                <span>
                                    {new Date(article.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                            </p>

                        </Link>
                    ))}
                </div>
            </div>

        </div >
    )
}

export default TopArticles