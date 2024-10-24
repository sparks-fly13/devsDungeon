"use client";
import { Button } from '@/components/ui/button'
import { GlobalSearchFilters } from '@/constants/filters'
import { formUrl } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get('type');

  const [active, setActive] = useState(type || '');

  const handleFilterClick = (value: string) => {
    if(active === value) {
      setActive('');
      const newUrl = formUrl({
        params: searchParams.toString(),
        key: 'type',
        value: null
      })
      router.push(newUrl, {scroll: false});
    }
    else {
      setActive(value);
      const newUrl = formUrl({
        params: searchParams.toString(),
        key: 'type',
        value: value.toLowerCase()
      })
      router.push(newUrl, {scroll: false});
    }
  }

  return (
    <div className='flex items-center gap-5 px-5'>
        <p className='text-dark400_light900 body-medium'>Type: </p>
        <div className='flex gap-3'>
            {GlobalSearchFilters.map((item) => (
              <Button type='button' key={item.value} onClick={() => handleFilterClick(item.value)}
              className={`light-border-2 small-medium rounded-2xl px-5 py-2 capitalize
              dark:text-light-900 hover:dark:text-primary-500
              ${active===item.value ? 'bg-primary-500 text-light-900 hover:dark:text-primary-100' : 'bg-light-700 text-dark-400 dark:bg-dark-500'}`}>
                {item.name}
              </Button>
            ))}
        </div>
    </div>
  )
}

export default GlobalFilters