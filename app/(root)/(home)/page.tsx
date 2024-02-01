import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How to create a new project in React?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    author: {
      _id: "1",
      name: "John Carter",
      avatar: "/assets/icons/avatar.svg",
    },
    upvotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date("2023-10-02T11:00:00.000Z"),
  },
  {
    _id: "2",
    title:
      "What is the possible practical reach of quantum computing in the next 10 years?",
    tags: [
      { _id: "3", name: "Quantum Computing" },
      { _id: "2", name: "Future" },
    ],
    author: {
      _id: "2",
      name: "Fiona Smith",
      avatar: "/assets/icons/avatar.svg",
    },
    upvotes: 20021,
    views: 800213,
    answers: [],
    createdAt: new Date("2023-11-22T08:00:00.000Z"),
  },
  {
    _id: "3",
    title: "How to stylize a React component?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "4", name: "Css" },
    ],
    author: {
      _id: "3",
      name: "Hazel Jean",
      avatar: "/assets/icons/avatar.svg",
    },
    upvotes: 18,
    views: 120,
    answers: [],
    createdAt: new Date("2023-07-06T15:00:00.000Z"),
  },
];

export default function Home() {
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
    </>
  );
}
