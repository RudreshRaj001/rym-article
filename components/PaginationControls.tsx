"use client"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "./ui/use-toast";

const PaginationControls = (
    { totalPages }: { totalPages: number }
) => {

    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const { toast } = useToast()

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.forEach((value, key) => {
            params.delete(key);
        });
        replace(`${pathname}?${params.toString()}`);
    }, []);

    const handleNextClick = () => {
        setCurrentPage(prevPage => prevPage < totalPages ? prevPage + 1 : totalPages);
        if (currentPage === totalPages) {
            toast({
                title: "No more pages",
                description: "You have reached the last page",
            })
            return;
        }
        const params = new URLSearchParams(searchParams);
        params.set('page', String(currentPage + 1));
        replace(`${pathname}?${params.toString()}`);
    };

    const handlePreviousClick = () => {
        setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : 1);
        if (currentPage === 1) {
            toast({
                title: "No more pages",
                description: "You have reached the first page",
            })
            // delete the page query param
            const params = new URLSearchParams(searchParams);
            params.delete('page');
            replace(`${pathname}?${params.toString()}`);
            return;
        }
        if (currentPage === 2) {
            const params = new URLSearchParams(searchParams);
            params.delete('page');
            replace(`${pathname}?${params.toString()}`);
            return;
        }
        const params = new URLSearchParams(searchParams);
        params.set('page', String(currentPage - 1));
        replace(`${pathname}?${params.toString()}`);

    };

    if (totalPages < 2) {
        return null
    }

    return (
        <Pagination className="bg-neutral-50/10 mx-auto w-fit rounded-xl px-10 py-2 mt-5">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={handlePreviousClick}
                        className="cursor-pointer"

                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink >{currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext onClick={handleNextClick}
                        className="cursor-pointer"
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationControls