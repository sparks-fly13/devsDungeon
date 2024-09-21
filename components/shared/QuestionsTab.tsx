import { getUserQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types'
import React from 'react'
import QuestionCard from '../cards/QuestionCard';

interface QuestionsTabProps extends SearchParamsProps {
    userId: string;
    clerkId?: string | null;
}

const QuestionsTab = async ({searchParams, userId, clerkId} : QuestionsTabProps) => {
    const {totalQuestions, userQuestions} = await getUserQuestions({userId, page:1});

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
    </>
  )
}

export default QuestionsTab