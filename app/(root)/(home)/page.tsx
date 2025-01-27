import QuestionCard from "@/components/cards/QuestionCard";
import LargeScreenFilters from "@/components/home/LargeScreenFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata : Metadata = {
  title: "Home | DevsDungeon",
  description: "Welcome to the landing page of DevsDungeon. You can explore a lot of things starting and create your very own community of amazing developers!"
}

export default async function Home({searchParams} : SearchParamsProps) {
  const pageSize = searchParams.pageSize ? +searchParams.pageSize : 3;

  const {questions, isNext} = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 hover:primary-gradient-hover">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 max-md:flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search queries"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
        <LargeScreenFilters />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => {
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
            title="There's no question to display here"
            description="Be the first to traverse this dungeon of developers! ✈️ Ask a question
          and kickstart the discussion❓. Our query could be the very thing others
          learn from. Hope to see you around!! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={isNext} defaultPageSize={pageSize}/>
      </div>
    </>
  );
}
