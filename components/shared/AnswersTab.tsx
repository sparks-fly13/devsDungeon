import { getUserAnswers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types'
import React from 'react'
import { get } from 'http';
import AnswerCard from '../cards/AnswerCard';

interface AnswersTabProps extends SearchParamsProps {
    userId: string;
    clerkId?: string | null;
}

const AnswersTab = async ({searchParams, userId, clerkId} : AnswersTabProps) => {
    const {userAnswers, totalAnswers} = await getUserAnswers({userId, page:1});

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
    </>
  )
}

export default AnswersTab