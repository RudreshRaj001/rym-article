import { getFeaturedArticles } from '@/app/actions'
import Image from 'next/image';
import React from 'react'
import { Ubuntu } from 'next/font/google'
import { Libre_Caslon_Text } from 'next/font/google';
import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';

const titleFont = Libre_Caslon_Text({ subsets: ["latin"], weight: "700" });
export const navigationFont = Ubuntu({ subsets: ["latin"], weight: "400" });

// const articles: {
//   id: string;
//   title: string;
//   subheading: string;
//   content: string;
//   banner: string;
//   authorId: string;
//   createdAt: Date;
//   updatedAt: Date;
// }[]

const Featured = async () => {
  const articles = await getFeaturedArticles();
  const firstArticle = articles[0];
  const restArticles = articles.slice(1);

  return (
    <div className='w-full flex flex-col gap-5'>
      <div>
        <div className='h-1 bg-black w-full' />
        <h1
          className={`text-xl ${titleFont.className} underline flex items-center my-2 gap-1`}
        >
          <Star size={24} strokeWidth={1} fill='gold' />
          Featured Articles
          <ChevronRight />
        </h1>
        <div className='h-[1px] bg-black w-full ' />
      </div>
      <Link className='w-full lg:h-96 bg-[#29303C] text-white rounded-md flex  justify-between lg:gap-10
        shadow-sm hover:opacity-[0.98]
        lg:flex-row flex-col-reverse
      '
        href={`/article/${firstArticle.id}`}
      >
        <div className='lg:w-1/2 lg:p-10 p-5 flex flex-col gap-3'>
          <h1 className={`text-3xl 
              ${titleFont.className}
              underline
            `}>{firstArticle.title}</h1>
          <p className={` ${navigationFont.className}`}>{firstArticle.subheading}</p>
        </div>
        <div className='lg:w-1/2 flex items-center justify-center rounded-sm'>
          <Image src={firstArticle.banner} alt='banner'
            width={700}
            height={400}
            className='rounded-r-md max-w-full max-h-full  object-cover'
          />
        </div>
      </Link>

      <div>
        <div className='lg:grid grid-cols-4 flex flex-col gap-3'>
          {restArticles.map((article) => (
            <Link className='bg-secondary rounded-md 
              hover:shadow-xl transition duration-200 ease-in-out cursor-pointer hover:scale-[1.02]
              shadow-md
              flex lg:flex-col 
              
            ' key={article.id}
              href={`/article/${article.id}`}


            >
              <div className='lg:h-40 lg:w-full bg-[#29303C] rounded-l-md w-1/3 '>
                <Image src={article.banner} alt='banner'
                  width={700}
                  height={400}
                  className='rounded-l-md max-w-full h-full object-cover'
                />
              </div>
              <div className='p-5 space-y-3 lg:w-full w-2/3'>
                <h1 className={`text-xl 
              ${titleFont.className}
              lg:line-clamp-3
              line-clamp-2
              underline
            `}>{article.title}</h1>
                <p className={` ${navigationFont.className} lg:line-clamp-5
                  line-clamp-2
                `}>{article.subheading}</p>
              </div>

            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Featured