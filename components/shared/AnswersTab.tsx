import { getUserAnswers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types'
import React from 'react'
import AnswerCard from '../cards/AnswerCard';
import Pagination from './Pagination';

interface AnswersTabProps extends SearchParamsProps {
    userId: string;
    clerkId?: string | null;
}

const AnswersTab = async ({searchParams, userId, clerkId} : AnswersTabProps) => {
    const pageSize = searchParams.pageSize ? +searchParams.pageSize : 3;
    const {userAnswers, isNext} = await getUserAnswers({
        userId,
        page: searchParams.page ? +searchParams.page : 1,
        pageSize
    });

  return (
    <>
        <div className='mt-5 flex w-full flex-col gap-3'>
            {userAnswers.map((answer) => (
                <AnswerCard
                    key={answer._id}
                    _id={answer._id}
                    clerkId={clerkId}
                    question={answer.question}
                    author={answer.author}
                    upvotes={answer.upvotes}
                    createdAt={answer.createdAt}
                />
            ))}
        </div>
        <div className="mt-10">
            <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={isNext} defaultPageSize={pageSize}/>
        </div>
    </>
  )
}

export default AnswersTab