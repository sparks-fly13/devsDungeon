"use client";

import { HomePageFilters } from "@/constants/filters";
import React from "react";
import { Button } from "../ui/button";

const LargeScreenFilters = () => {
  const active = "newest";

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => {
        return (
          <Button
            className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
              active === item.value
                ? "bg-primary-100 text-primary-500 hover:bg-primary-200"
                : "bg-light-800 text-light-500 hover:bg-light-900 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-500"
            }`}
            key={item.value}
            onClick={() => {}}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default LargeScreenFilters;
