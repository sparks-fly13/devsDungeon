"use client";

import { Input } from "@/components/ui/input";
import { formUrl, removeKeysInQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import GlobalSearchResults from "./GlobalSearchResults";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [searchValue, setSearchValue] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if(searchValue) {
        const newUrl = formUrl({
          params: searchParams.toString(),
          key: 'global',
          value: searchValue
        })
        router.push(newUrl, {scroll: false});
      }
      else {
          const newUrl = removeKeysInQuery({
            params: searchParams.toString(),
            keys: ['global', 'type']
          })
          router.push(newUrl, {scroll: false});
        }
    }, 600)
    return () => clearTimeout(debounce);
  }, [router, searchValue]);

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Traverse the dungeon"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            if(!isOpen) setIsOpen(true);
            if(e.target.value === "" && isOpen) setIsOpen(false);
          }}
          className="paragraph-regular no-focus placeholder text-dark400_light700 background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
      {isOpen && <GlobalSearchResults />}
    </div>
  );
};

export default GlobalSearch;
