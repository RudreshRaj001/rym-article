import ArticlesTable from '@/components/admin/ArticlesTable'
import React from 'react'
import { Libre_Caslon_Text } from 'next/font/google';
const titleFont = Libre_Caslon_Text({ subsets: ["latin"], weight: "700" });

const page = () => {
  return (
    <div className='space-y-5'>
      <h1 className={`text-3xl ${titleFont.className} text-center underline`}>
        Manage Article
      </h1>
      <ArticlesTable />
    </div>
  )
}

export default page