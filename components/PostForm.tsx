/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Category } from '@prisma/client';
import { X } from 'lucide-react';
import { Badge } from './ui/badge';
const FormSchema = z.object({
    title: z.string().min(1, 'Title is required').max(300, 'Title is too long, Only 300 characters allowed'),
    subheading: z.string().min(1, 'Subheading is required').max(500, 'Subheading is too long, Only 500 characters allowed'),
    content: z.string().min(1, 'Content is required'),
    banner: z.string().url('Banner URL is invalid'),
    category: z.string().min(1, 'Category is required'),
    tags: z.array(z.string())

});

const PostForm = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tagError, setTagError] = useState<string | null>(null);
    const router = useRouter()
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            content: '',
            banner: '',
            category: '',
            subheading: '',
            tags: []
        },
    });


    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const submissionValues = {
            ...values,
            tags: tags, // Include tags from state
        };
        

        try {
            setLoading(true);
            const res = await fetch('/api/admin/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionValues),
            });

            if (res.ok) {
                const data = await res.json();
                router.push(`/admin`);
            }
            else {
                const data = await res.json();
                console.error(data);
                toast({
                    title: 'Failed to create post',
                    description: data.message,
                    variant: 'destructive'
                });
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Failed to create post',
                description: 'Something went wrong',
                variant: 'destructive'
            });
            setLoading(false);
        }
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const tag = e.currentTarget.value.trim();
            // Updated validation to include check for digits and alphabets only after '#'
            if (!tag.startsWith('#') || !/^#[A-Za-z0-9]+$/.test(tag)) {
                setTagError('Tags must start with # and contain only letters and digits');
                return;
            }
            setTagError(null);
            setTags([...tags, tag]);
            e.currentTarget.value = '';
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className='border p-5 rounded-lg bg-white/50 lg:w-3/4 w-full   mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-5'>
                    <div className="flex gap-5">
                        <div className='space-y-2 w-full'>
                            <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder='Enter Title...' {...field}
                                                className='bg-transparent/10'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='subheading'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subheading</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder='Enter Subheading...' {...field}
                                                className='bg-transparent/10'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='content'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder='Enter Content...' {...field}
                                                className='bg-transparent/10'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='category'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col gap-2'>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <select
                                                {...field}
                                                ref={field.ref} // Ensure the select is correctly linked to react-hook-form
                                                className='bg-transparent/10 w-full p-2 rounded-md'
                                            >
                                                {Object.values(Category).map((category, index) => (
                                                    <option key={index} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormItem>
                                <FormLabel>Tags {" "}
                                    <span className='text-muted-foreground'>(Press Enter to add)</span>

                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Enter tags with # and press Enter'
                                        className='bg-transparent/10'
                                        onKeyDown={handleTagInputKeyDown}
                                    />
                                </FormControl>
                                {tagError && <p className='text-red-500'>{tagError}</p>}
                                <div className='flex flex-wrap gap-2 mt-2'>
                                    {tags.map((tag, index) => (
                                        <div key={index} className=' rounded flex items-center'>
                                            <Badge>{tag}</Badge>
                                            <button
                                                type='button'
                                                className='ml-2 text-red-500'
                                                onClick={() => removeTag(index)}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </FormItem>
                            <FormField
                                control={form.control}
                                name='banner'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Banner Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter Banner URL...' {...field}
                                                className='bg-transparent/10'
                                                onChange={(e) => {
                                                    setPreviewUrl(e.target.value);
                                                    field.onChange(e); // Ensure form state is updated
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='my-2 w-full flex justify-center'>
                                {previewUrl && (
                                    <img src={previewUrl} alt="invalid image url" className='w-[300px] h-[300px] object-contain' />
                                )}

                            </div>
                        </div>
                    </div>
                    <Button className='w-fit ml-auto' type='submit'
                        disabled={loading}
                    >
                        {
                            loading ? 'Creating...' : 'Create Article'
                        }
                    </Button>
                </form>
            </Form>
        </div >
    )
}

export default PostForm


// model Article {
//     id         String   @id @default(auto()) @map("_id") @db.ObjectId
//     title      String
//     subheading String
//     content    String
//     banner     String
//     category   Category
//     tags       String[]
// }