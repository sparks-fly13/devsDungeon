import AnswerForm from "@/components/forms/AnswerForm";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHtml from "@/components/shared/ParseHtml";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect} from "next/navigation";
import React from "react";

const QuestionPage = async ({ params, searchParams }: any) => {
  const question = await getQuestionById({ questionId: params.id });
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById({ userId });
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.avatar}
              alt="user"
              className="rounded-full"
              width={22}
              height={22}
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end text-dark500_light700">
            <Votes
              type="Question"
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(user._id)}
              upvotes={question.upvotes.length}
              hasupVoted={question.upvotes.includes(user._id)}
              downvotes={question.downvotes.length}
              hasdownVoted={question.downvotes.includes(user._id)}
              hasSaved={user?.saved.includes(question._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>
      <div className="mb-s mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="When"
          value={` asked ${getTimestamp(question.createdAt)}`}
          title=" "
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Message"
          value={formatNumber(question.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="Views"
          value={formatNumber(question.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHtml data={question.questionBody} />

      <div className="flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>
      <AllAnswers
        questionId={question._id}
        userId={user._id}
        totalAnswers={question.answers.length}
        filter={searchParams?.filter}
        page={searchParams?.page}
      />
      <AnswerForm
        question={question.questionBody}
        questionId={JSON.stringify(question._id)}
        authorId={JSON.stringify(user._id)}
      />
    </>
  );
};

export default QuestionPage;
