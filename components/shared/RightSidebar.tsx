import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

const topQuestions = [
  {
    _id: "1",
    title: "How to use React Query?",
  },
  {
    _id: "2",
    title: "Is it possible to use React Query with Next.js?",
  },
  {
    _id: "3",
    title: "Do you use React Query?",
  },
  {
    _id: "4",
    title: "How does Next.js work?",
  },
  {
    _id: "5",
    title: "Are Next.js and React Query compatible?",
  },
];

const popularTags = [
  {
    _id: "1",
    name: "React",
    totalQuestions: 3,
  },
  {
    _id: "2",
    name: "JavaScript",
    totalQuestions: 4,
  },
  {
    _id: "3",
    name: "Next.js",
    totalQuestions: 5,
  },
  {
    _id: "4",
    name: "Jquery",
    totalQuestions: 2,
  },
  {
    _id: "5",
    name: "Ruby on Rails",
    totalQuestions: 1,
  },
];

const RightSidebar = () => {
  return (
    <section className="background-light900_dark200 custom-scrollbar light-border sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-[5%] shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {topQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium  text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                width={20}
                height={20}
                alt="chevron-right"
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4 text-dark500_light700">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
