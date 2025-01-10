"use client";

import { HomePageFilters } from "@/constants/filters";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrl } from "@/lib/utils";

const LargeScreenFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState('');

  const handleFilterClick = (value: string) => {
    if(active === value) {
      setActive('');
      const newUrl = formUrl({
        params: searchParams.toString(),
        key: 'filter',
        value: null
      })
      router.push(newUrl, {scroll: false});
    }
    else {
      setActive(value);
      const newUrl = formUrl({
        params: searchParams.toString(),
        key: 'filter',
        value: value.toLowerCase()
      })
      router.push(newUrl, {scroll: false});
    }
  }

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => {
        return (
          <Button
            className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
              active === item.value
                ? "bg-primary-100 text-primary-500 hover:bg-primary-200 hover:-translate-y-1 transition duration-300"
                : "bg-light-800 text-light-500 hover:bg-light-900 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-500 hover:-translate-y-1 transition duration-300"
            }`}
            key={item.value}
            onClick={() => handleFilterClick(item.value)}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default LargeScreenFilters;
