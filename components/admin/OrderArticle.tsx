
"use client"
import { Category } from '@prisma/client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';


interface Article {
    id: string;
    title: string;
    subheading: string;
    content: string;
    banner: string;
    category: Category
    tags: string[];
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
}
interface OrderArticleProps {
    articleList: Article[];
}

const OrderArticle: React.FC<OrderArticleProps> = ({ articleList }) => {
    const [articles, setArticles] = useState<Article[]>(Array.isArray(articleList) ? articleList : []);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(articles);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setArticles(items); // Assuming you have a state setter for articles
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="articles">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {articles.map((article, index) => (
                            <Draggable key={article.id} draggableId={article.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Image src={article.banner} alt='banner'
                                            width={100}
                                            height={100}
                                            className='rounded-sm object-contain'
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default OrderArticle