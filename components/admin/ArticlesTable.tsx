import { getAllArticlesByAdmin } from '@/app/actions'
import { Link2, NotebookPen, Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
// import { Link2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { Badge } from '../ui/badge';
import PaginationControls from '../PaginationControls';
import { Libre_Caslon_Text, Ubuntu } from 'next/font/google';
import { DeleteButton, EditButton, FeatureButton } from './ArticleControlsButton';
const titleFont = Libre_Caslon_Text({ subsets: ["latin"], weight: "400" });
const titleFontBold = Libre_Caslon_Text({ subsets: ["latin"], weight: "700" });
const ubuntuFont = Ubuntu({ subsets: ["latin"], weight: "400" });
const ArticlesTable = async (
  { searchParams }: {
    searchParams?: {
      page?: string;
    };
  }
) => {
  const currentPage = Number(searchParams?.page) || 1;
  const data = await getAllArticlesByAdmin(currentPage);
  const articles = data.articles;
  const totalPages = data.totalPages;

  return (
    <div className='p-3 border overflow-auto'>
      <table className="w-full ">
        <thead
          className='bg-gray-50'
        >
          <tr>
            <th className="w-1/12 text-center">Link</th>
            <th className="w-3/12 break-words">Title</th>
            <th className="w-2/12 text-center">Banner</th>
            <th className="w-2/12 text-center">Category</th>
            <th className="w-2/12 text-center">CreatedAt</th>
            <th className="w-1/12 text-center">Feature</th>
            <th className="w-1/12 text-center">Update</th>
            <th className="w-1/12 text-center">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {articles.map((article, index) => (
            <tr key={index} className="text-center">
              <td className="py-2">
                <Link href={`/article/${article.id}`} className="text-blue-700 underline">
                  <Link2 className='mx-auto' />
                </Link>
              </td>
              <td className={`break-words text-left py-2
                line-clamp-2
                ${titleFontBold.className}
                `}>{article.title}</td>
              <td className="py-2">
                <Image src={article.banner} alt="banner"
                  width={100}
                  height={100}
                  className="rounded-sm object-contain mx-auto"
                />
              </td>
              <td className={`py-2`}>
                <Badge>{article.category}</Badge>
              </td>
              <td className={`py-2 text-sm ${ubuntuFont.className}`}>
                {new Date(article.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </td>
              <td className="py-2">
                <FeatureButton articleId={article.id}
                  isFeatured={article.FeaturedArticle ? true : false}
                />
              </td>
              <td className="p-2">
                <div className='bg-blue-500 p-2 rounded-md shadow-lg w-fit mx-auto'>
                  <EditButton articleId={article.id} />
                </div>
              </td>
              <td className="p-2 ">
                <div className='bg-red-500 p-2 rounded-md shadow-lg'>
                  <DeleteButton articleId={article.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationControls totalPages={totalPages} />
    </div>
  )
}

export default ArticlesTable


// table contents should be: id, title,  banner, category,createdAt, star button, update ,delete 

// articles: {
//   id: string;
//   title: string;
//   subheading: string;
//   content: string;
//   banner: string;
//   category: $Enums.Category;
//   tags: string[];
//   authorId: string;
//   createdAt: Date;
//   updatedAt: Date;
// }[];