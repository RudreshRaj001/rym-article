"use client"
import React from 'react'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation';

const MakeAdminButton = (
    { userId, isAdmin }: {
        userId: string;
        isAdmin: boolean;
    }
) => {
    const [loading, setLoading] = React.useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const handleMakeAdmin = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/toggle-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                })
            });

            const data = await res.json();
            if (res.ok) {
                toast({
                    title: "Success",
                    description: data.message
                })
                router.refresh();
            }
            else {
                toast({
                    title: "Error",
                    description: data.message
                })
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <button className={` text-white px-2 py-1 rounded-md
        ${isAdmin ? "bg-red-500" : "bg-blue-500"}
            `}
            onClick={handleMakeAdmin}
            disabled={loading}
        >
            {isAdmin ? "Remove Admin" : "Make Admin"}
        </button>
    )
}

export default MakeAdminButton