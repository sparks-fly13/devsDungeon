import { getTopTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";

interface UserProps {
  user: {
    _id: string;
    clerkId: string;
    avatar: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: UserProps) => {
  const topUserTags = await getTopTags({ userId: user._id });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.avatar}
          alt="User Avatar"
          width={100}
          height={100}
          className="rounded-full border border-rose-500 w-36 h-36"
        />

        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>

        <div className="mt-5">
          {topUserTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {topUserTags.map((tag) => {
                return (
                  <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
                );
              })}
            </div>
          ) : (
            <Badge>No Tags</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
