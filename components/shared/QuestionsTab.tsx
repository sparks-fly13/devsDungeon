import { getUserQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types'
import React from 'react'
import QuestionCard from '../cards/QuestionCard';
import Pagination from './Pagination';

interface QuestionsTabProps extends SearchParamsProps {
    userId: string;
    clerkId?: string | null;
}

const QuestionsTab = async ({searchParams, userId, clerkId} : QuestionsTabProps) => {
    const pageSize = searchParams.pageSize ? +searchParams.pageSize : 3;
    const {userQuestions, isNext} = await getUserQuestions(
        {userId,
        page: searchParams.page ? +searchParams.page : 1,
        pageSize
    });

  return (
    <>
        <div className='mt-5 flex w-full flex-col gap-3'>
            {userQuestions.map((question) => (
                <QuestionCard
                    key={question._id}
                    _id={question._id}
                    clerkId={clerkId}
                    title={question.title}
                    tags={question.tags}
                    author={question.author}
                    upvotes={question.upvotes}
                    views={question.views}
                    answers={question.answers}
                    createdAt={question.createdAt}
                />
            ))}
        </div>
        <div className="mt-10">
            <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={isNext} defaultPageSize={pageSize}/>
        </div>
    </>
  )
}

export default QuestionsTab