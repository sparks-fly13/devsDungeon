import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
    return (
        <section>
            <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
                <h1 className='h1-bold text-dark100_light900'>Your Saved Questions</h1>
            </div>

            <div className='mb-12 mt-11 flex flex-wrap items-center justify-between gap-5'>
                <Skeleton className='h-14 flex-1'/>
                <div className='hidden max-md:block'>
                    <Skeleton className='h-14 w-28'/>
                </div>
            </div>

            <div className='my-10 hidden flex-wrap gap-6 md:flex'>
                <Skeleton className='h-9 w-40' />
                <Skeleton className='h-9 w-40' />
                <Skeleton className='h-9 w-40' />
                <Skeleton className='h-9 w-40' />
            </div>

            <div className='flex flex-col gap-6'>
                {[1,2,3].map((item) => (
                    <Skeleton key={item} className='h-48 w-full rounded-xl' />
                ))}
            </div>
        </section>
    )
}

export default Loading