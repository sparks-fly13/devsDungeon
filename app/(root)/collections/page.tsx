import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

export default async function Collections({searchParams} : SearchParamsProps) {
  const {userId} = auth();

  if(!userId) return;
  let pageSize = 2;
  const {savedQuestions, isNext} = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize
  });

  return (
    <>
        <h1 className="h1-bold text-dark100_light900">Your saved questions</h1>

      <div className="mt-11 max-md:flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/collections"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search queries"
          otherClasses="flex-1 lg:mb-[13px] max-sm:mb-0"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {savedQuestions.length > 0 ? (
          savedQuestions.map((question: any) => {
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
            title="There's no saved question to display here"
            description="Be the first to traverse this dungeon of developers! ✈️ Ask a question
          and kickstart the discussion❓. Our query could be the very thing others
          learn from. Hope to see you around!! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={isNext} defaultPageSize={pageSize} pathName="/collections"/>
      </div>
    </>
  );
}
