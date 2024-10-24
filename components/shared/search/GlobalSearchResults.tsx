"use client";
import React, { useEffect, useState } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import GlobalFilters from './GlobalFilters';
import { globalSearch } from '@/lib/actions/general.action';

const GlobalSearchResults = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const globalQuery = searchParams.get('global');
  const type = searchParams.get('type');

  useEffect(() => {
    const fetchResults = async () => {
      setResults([]);
      setIsLoading(true);

      try {
        const res = await globalSearch({query: globalQuery, type});
        setResults(JSON.parse(res));
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
    if(globalQuery) fetchResults();
  }, [globalQuery, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case 'question':
        return `/question/${id}`;
      case 'answer':
        return `/question/${id}`;
      case 'tag':
        return `/tags/${id}`;
      case 'user':
        return `/profile/${id}`;
      default:
        return '/';
    }
  }


  return (
    <div className='absolute top-full z-10 mt-3 w-full bg-light-800 py-5 shadow-sm dark:bg-dark-400 rounded-xl'>
      <p className='text-dark400_light900 paragraph-semibold px-5'>
        <GlobalFilters />
      </p>
      <div className='my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50'></div>
      <div className='space-y-5'>
        <p className='text-dark400_light900 paragraph-semibold px-5'>
          Top Match
        </p>

        {isLoading ? (
          <div className='flex-center flex-col px-5'>
            <ReloadIcon className='my-2 h-10 w-10 text-primary-500 animate-spin' />
            <p className='text-dark200_light800 body-regular'>Browsing through our dungeons for you</p>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            {results.length > 0 ? (
              results.map((result: any, key: number) => (
                <Link href={renderLink(result.type, result.id)} key={result.type + result.id + key} className='flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 hover:dark:bg-dark-500/50'>
                  <Image src='/assets/icons/tag.svg' alt='tags' width={18} height={18} className='invert-colors mt-1 object-contain' />
                  <div className='flex flex-col'>
                    <p className='body-medium text-dark200_light800 line-clamp-1'>{result.title}</p>
                    <p className='text-dark400_light500 small-medium mt-1 font-bold capitalize'>{result.type}</p>
                  </div>
                </Link>
              ))
            ) : <div className='flex-center flex-col px-5'>
              <p className='text-dark200_light800 body-regular px-5 py-2.5'>No results found :/</p>
            </div>
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default GlobalSearchResults