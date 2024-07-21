"use client"
import { NotebookPen, Star, Trash2 } from 'lucide-react'
import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';


const handleFeature = async (articleId: string) => {
  try {
    toast.loading('Processing...')
    const res = await fetch(`/api/admin/feature`, {
      method: 'POST',
      body: JSON.stringify({ articleId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    toast.dismiss()
    toast.success(data.message)
    window.location.reload()
  } catch (error) {
    toast.dismiss()
    toast.error('Error processing request')
  }


}

const handleEdit = (articleId: string) => {
  console.log('edit article id: ', articleId)
}

const handleDelete = (articleId: string) => {
  console.log('delete article id: ', articleId)
}


export const FeatureButton = (
  { articleId, isFeatured }: { articleId: string, isFeatured: boolean }
) => {
  return (
    <Star size={24} className='mx-auto cursor-pointer
      hover:stroke-current hover:text-yellow-500
    '
      fill={isFeatured ? 'gold' : 'transparent'}
      strokeWidth={1}

      onClick={() => handleFeature(articleId)}
    />

  )
}

export const EditButton = (
  { articleId }: { articleId: string }
) => {
  return (
    <Link href={`/admin/edit/${articleId}`} >
      <NotebookPen size={20} color='white' />
    </Link>
  )
}

export const DeleteButton = (
  { articleId }: { articleId: string }
) => {
  return (
    <Trash2 size={20} color='white' />
  )
}