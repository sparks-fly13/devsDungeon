import Link from "next/link";
import React from "react";
import Metric from "../shared/Metric";
import { formatNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditAndDeleteActions from "../shared/EditAndDeleteActions";

interface AnswerProps {
  _id: string;
  clerkId?: string | null;
  question: { _id: string; title: string };
  author: { _id: string; clerkId: string; name: string; avatar: string };
  upvotes: Array<object>;
  createdAt: Date;
}

const AnswerCard = ({
  _id,
  clerkId,
  question,
  author,
  upvotes,
  createdAt,
}: AnswerProps) => {
    const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <Link href={`/question/${question._id}/#${_id}`} className="card-wrapper rounded-[10px] px-11 py-9">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 flex line-clamp-1 sm:hidden">
            {getTimestamp(createdAt)}
          </span>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
        </div>
        
        <SignedIn>
            {showActionButtons && (
                <EditAndDeleteActions type="Answer" itemId={JSON.stringify(_id)} />
            )}
        </SignedIn>

      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.avatar}
          alt="User"
          value={author.name}
          title={` - answered ${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyles="medium text-dark300_light700"
        />

        <div>
            <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatNumber(upvotes.length)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
            />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
