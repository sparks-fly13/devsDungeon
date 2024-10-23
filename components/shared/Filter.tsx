"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface filterProps {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: filterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramsFilter = searchParams.get('filter');

  const handleFilterClick = (value: string) => {
    const newUrl = formUrl({
      params: searchParams.toString(),
      key: 'filter',
      value: value.toLowerCase()
    })
    router.push(newUrl, {scroll: false});
  };

  return (
    <>
      <div className={`relative ${containerClasses}`}>
        <Select onValueChange={handleFilterClick} defaultValue={paramsFilter || undefined}>
          <SelectTrigger
            className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
          >
            <div className="line-clamp-1 flex-1 text-left">
              <SelectValue placeholder="Filter select" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup  className="mb-[-4px]">
              {filters.map((item) => {
                return (
                  <SelectItem
                    className="text-dark500_light700 cursor-pointer background-light850_dark100"
                    key={item.value}
                    value={item.value}
                  >
                    {item.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Filter;
