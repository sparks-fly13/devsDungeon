"use client";

import { Input } from "@/components/ui/input";
import { formUrl, removeKeysInQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface localSearchProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: localSearchProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [searchValue, setSearchValue] = useState(query || "");

  useEffect(() => {
    const debounce = setTimeout(() => {
      if(searchValue) {
        const newUrl = formUrl({
          params: searchParams.toString(),
          key: 'q',
          value: searchValue
        })
        router.push(newUrl, {scroll: false});
      }
      else {
        if(pathName === route) {
          const newUrl = removeKeysInQuery({
            params: searchParams.toString(),
            keys: ['q']
          })
          router.push(newUrl, {scroll: false});
        }
      }
    }, 600);

    return () => clearTimeout(debounce);
  }, [searchValue, searchParams])

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark500_light700 bg-transparent border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
