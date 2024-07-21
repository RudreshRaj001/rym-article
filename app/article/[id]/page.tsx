import { getArticleById, getRelatedArticles } from '@/app/actions'
import CopyArticleLink from '@/components/CopyArticleLink';
import TopArticles from '@/components/TopArticles';
import { Ubuntu } from 'next/font/google'
import { Libre_Caslon_Text } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
const titleFont = Libre_Caslon_Text({ subsets: ["latin"], weight: "400" });
const titleFontBold = Libre_Caslon_Text({ subsets: ["latin"], weight: "700" });
const ubuntuFont = Ubuntu({ subsets: ["latin"], weight: "400" });

const page = async (
    { params }: { params: { id: string } }
) => {
    const article = await getArticleById(params.id);
    const relatedArticles = await getRelatedArticles(params.id);
    if (!article) {
        return (
            <div>
                No article found
            </div>
        )
    }

    return (
        <div className='py-10 flex flex-col gap-20'>
            <div className='flex sm:gap-20 lg:gap-10 xl:gap-20 lg:flex-row flex-col'>
                <div className='flex flex-col  lg:w-2/3 w-full '>
                    <div className='flex gap-2 text-muted-foreground text-sm items-center'>
                        <p className={`${ubuntuFont} font-bold`}>Article</p>
                        {"|"}
                        <p className={`${ubuntuFont} `}>
                            {new Date(article.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                        <CopyArticleLink articleId={article.id} />
                    </div>

                    <div className='flex flex-col gap-3 mt-5'>
                        <p className={`text-4xl ${titleFontBold.className} `}>
                            {article.title}
                        </p>
                        <p className={`${titleFontBold.className} `}>
                            {article.subheading}
                        </p>

                        <Image src={article.banner} alt='banner' width={1200} height={600} className='rounded-sm mt-5' />

                        <div className={`mt-5 ${titleFont.className}`}>
                            {article.content}
                        </div>
                    </div>
                </div>
                <hr className='lg:hidden my-10' />
                <div className='lg:w-1/3 w-full lg:p-5 p-3'>
                    <p className={`text-xl ${titleFontBold.className}`}>Related Articles</p>
                    <div className='flex flex-col mt-10'>
                        {
                            relatedArticles.map((article) => (
                                <>
                                    <Link key={article.id} className='flex gap-2 group'
                                        href={`/article/${article.id}`}
                                    >
                                        <div>
                                            <p className={`line-clamp-3 text-sm ${titleFontBold.className} group-hover:underline`}>{article.title}</p>
                                        </div>
                                        <Image src={article.banner} alt='banner' width={80} height={100}
                                            className='object-contain rounded-md ml-auto'
                                        />
                                    </Link>
                                    <hr className='my-3' />
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
            <TopArticles />
        </div>
    )
}

export default page