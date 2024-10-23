import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

const Community = async ({searchParams} : SearchParamsProps) => {
  const pageSize = searchParams.pageSize ? +searchParams.pageSize : 2;
  const {users, isNext} = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 max-md:flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for other users"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px] lg:mt-4 md:mt-4"
        />
      </div>

      <section className="mt-12 flex flex-wrap justify-around gap-8">
        {users.length > 0 ? (
          users.map((user) => {
            return <UserCard key={user._id} user={user} />;
          })
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No Users to display</p>
            <Link
              href="/sign-up"
              className="mt-2 font-bold primary-text-gradient"
            >
              Join to be the first to traverse the dungeon!!
            </Link>
          </div>
        )}
      </section>
      <div className="mt-10">
        <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={isNext} defaultPageSize={pageSize}/>
      </div>
    </>
  );
};

export default Community;
