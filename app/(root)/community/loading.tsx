import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <section>
        <h1 className='h1-bold text-dark100_light900'>All Users</h1>
        <div className='mb-12 mt-11 flex flex-wrap gap-5'>
            <Skeleton className='h-14 flex-1'/>
            <Skeleton className='h-14 w-28'/>
        </div>
        <div className='flex flex-wrap gap-4'>
            {[1,2,3,4].map((item) => (
                <Skeleton key={item} className='w-full h-60 rounded-2xl sm:w-[260px]'/>
            ))}
        </div>
    </section>
  )
}

export default Loading