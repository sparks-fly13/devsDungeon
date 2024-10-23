"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { formUrl } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface pageProps {
    pageNumber: number,
    isNext: boolean,
    defaultPageSize: number,
    pathName?: string
}

const Pagination = ({ pageNumber, isNext, defaultPageSize, pathName }: pageProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [pageSize, setPageSize] = useState(defaultPageSize);

    const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(Number(e.target.value));
    }
    const handlePageSizeSubmit = () => {
        const newUrl = formUrl({
            params: searchParams.toString(),
            key: 'pageSize',
            value: pageSize.toString(),
        });

        router.push(newUrl, { scroll: false });
    }

    const handleNavDirection = (direction: string) => {
        const nextPage = direction === 'next' ? pageNumber + 1 : pageNumber - 1;
        const newUrl = formUrl({
            params: searchParams.toString(),
            key: 'page',
            value: nextPage.toString()
        })
        router.push(newUrl);
    }

    if((pathName === '/tags/*' || pathName === '/question/*' || pathName === '/collections') && (pageNumber === 1 && !isNext)) return null;

    return (
        <div className='flex justify-between'>
            <div className='flex w-full items-center justify-center gap-2'>
                <Button disabled={pageNumber === 1} onClick={() => handleNavDirection('prev')} className='light-border-2 border btn flex min-h-[36px] items-center justify-center gap-2 disabled:cursor-wait'>
                    <p className='body-medium text-dark200_light800'>Prev</p>
                </Button>
                <div className='bg-primary-500 flex justify-center items-center rounded-md px-3.5 py-2'>
                    <p className='body-semibold text-light-900'>{pageNumber}</p>
                </div>
                <Button disabled={!isNext} onClick={() => handleNavDirection('next')} className='light-border-2 border btn flex min-h-[36px] items-center justify-center gap-2'>
                    <p className='body-medium text-dark200_light800'>Next</p>
                </Button>
            </div>
            {(pathName !== '/collections' && pathName !== '/tags/*' && pathName !== '/question/*') && 
            <div className='flex gap-2 flex-col-reverse'>
                <Input
                    type="text"
                    value={pageSize}
                    onChange={(e) => {
                        if (!isNaN(Number(e.target.value)))
                            handlePageInputChange(e);
                    }}
                    className="background-light800_darkgradient text-dark400_light700 justify-end border rounded px-2 py-1"
                    placeholder='Enter page size'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handlePageSizeSubmit();
                        }
                    }}
                />
                <Label htmlFor='pageSize' className='primary-text-gradient'>Your Dungeon's size?</Label>
            </div>
            }
        </div>
    )
}

export default Pagination