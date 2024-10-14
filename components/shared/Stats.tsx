import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

interface StatsProps {
    totalQuestions: number;
    totalAnswers: number;
}

interface StatsCardProps {
    imgUrl: string;
    value: number;
    title: string;
}

const StatsCard = ({imgUrl, value, title} : StatsCardProps) => {
    return (
        <div className='light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200'>
            <Image src={imgUrl} alt={title} width={40} height={50} />
            <div>
                <span className='paragraph-semibold text-dark200_light900'>
                    {value}
                </span>{`  `}
                <span className='body-medium text-dark400_light700'>{title}</span>
            </div>
        </div>
    )
}

const Stats = ({totalQuestions, totalAnswers} : StatsProps) => {
  return (
    <div className='mt-10'>
        <h4 className='h3-semibold text-dark200_light900'>Stats</h4>

        <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>
            <div className='light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200'>
                <div>
                    <span className='paragraph-semibold text-dark200_light900'>
                        {formatNumber(totalQuestions)}
                    </span>{`  `}
                    <span className='body-medium text-dark400_light700'>Questions</span>
                </div>

                <div>
                    <span className='paragraph-semibold text-dark200_light900'>
                        {formatNumber(totalAnswers)}
                    </span>{`  `}
                    <span className='body-medium text-dark400_light700'>Answers</span>
                </div>
            </div>

            <StatsCard imgUrl = "/assets/icons/gold-medal.svg" value={0} title="Gold Badges" />
            <StatsCard imgUrl = "/assets/icons/silver-medal.svg" value={0} title="Silver Badges" />
            <StatsCard imgUrl = "/assets/icons/bronze-medal.svg" value={0} title="Bronze Badges" />

        </div>
    </div>
  )
}

export default Stats