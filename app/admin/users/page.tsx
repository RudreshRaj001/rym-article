import { isSuperAdmin } from '@/app/actions';
import UsersTable from '@/components/admin/UsersTable';
import React from 'react'
import { Libre_Caslon_Text } from 'next/font/google';
const titleFont = Libre_Caslon_Text({ subsets: ["latin"], weight: "700" });

const page = async () => {
  const superAdmin = await isSuperAdmin();
  if (!superAdmin) {
    return (
      <div>
        <p>Not a super admin</p>
      </div>
    )
  }
  return (
    <div className='space-y-5'>
      <p className='text-red-500 text-sm text-center '>This is Super Admin Area !!!</p>
      <h1 className={`text-3xl ${titleFont.className} text-center underline`}>
        Create Article
      </h1>
      <UsersTable />
    </div>
  )
}

export default page