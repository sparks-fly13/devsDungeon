import QuestionCard from '@/components/cards/QuestionCard';
import NoResult from '@/components/shared/NoResult';
import LocalSearch from '@/components/shared/search/LocalSearch';
import { getQuestionsByTagId } from '@/lib/actions/tag.action';
import { URLProps } from '@/types';
import React from 'react'

const tagDetails = async ({params, searchParams}: URLProps) => {
  // console.log("Tag id in details page" + "   " + params.id);
  const {tagName, questions} = await getQuestionsByTagId({tagId: params.id, page: 1, searchQuery: searchParams.q})
  return (
    <>
        <h1 className="h1-bold text-dark100_light900">{tagName}</h1>

      <div className="mt-11 w-full">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search queries"
          otherClasses="flex-1 lg:mb-[13px] max-sm:mb-0"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question: any) => {
            return (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            );
          })
        ) : (
          <NoResult
            title="There are no questions with this tag to display here"
            description="Be the first to traverse this dungeon of developers! ✈️ Ask a question
          and kickstart the discussion❓. Our query could be the very thing others
          learn from. Hope to see you around!! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  )
}

export default tagDetails