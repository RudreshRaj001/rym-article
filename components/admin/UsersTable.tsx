import { getAllUsersBySuperAdmin, getUserId } from '@/app/actions'
import React from 'react'
import PaginationControls from '../PaginationControls';
import Link from 'next/link';
import MakeAdminButton from './MakeAdminButton';

const UsersTable = async (
    { searchParams }: {
        searchParams?: {
            page?: string;
        };
    }
) => {
    const currentPage = Number(searchParams?.page) || 1;
    const data = await getAllUsersBySuperAdmin(currentPage);
    let users = data.users;
    const totalPages = data.totalPages;
    const currentUser = await getUserId();
    users = users.filter(user => user.id !== currentUser);

    return (
        <div className='p-3 border'>
            {/* show s.no and user's name , email and button for makiing super admin  */}

            <table className="w-full ">
                <thead
                    className='bg-gray-50'
                >
                    <tr>
                        <th className="w-1/12 text-center">S.No</th>
                        <th className="w-3/12 break-words">Name</th>
                        <th className="w-2/12 text-center">Email</th>
                        <th className="w-2/12 text-center">Super Admin</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users.map((user, index) => (
                        <tr key={index} className="text-center">
                            <td className="py-2">{index + 1}</td>
                            <td className={`break-words  py-2`}>{user.name}</td>
                            <td className="py-2">{user.email}</td>
                            <td className="py-2">
                                <MakeAdminButton userId={user.id} isAdmin={user.isAdmin} />
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            <PaginationControls totalPages={totalPages} />
        </div>
    )
}

export default UsersTable