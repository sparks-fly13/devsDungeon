import TagCard from "@/components/cards/TagCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";
import React from "react";

const Tags = async ({searchParams} : SearchParamsProps) => {
  const pageSize = searchParams.pageSize ? +searchParams.pageSize : 6;

  const {tags, isNext} = await getAllTags({
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
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px] lg:mt-4 md:mt-4"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-10 justify-center">
        {tags.length > 0 ? (
          tags.map((tag) => {
            return <TagCard key={tag._id} tag={tag} />;
          })
        ) : (
          <NoResult
            title="No Tags found"
            description="Seems like no tags are there at the moment :("
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>
      <div className="mt-10">
        <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={isNext} defaultPageSize={pageSize}/>
      </div>
    </>
  );
};

export default Tags;
