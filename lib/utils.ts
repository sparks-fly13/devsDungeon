import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import queryString from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const date = new Date(createdAt);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 30;
  const years = months / 12;
  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds ago`;
  } else if (minutes < 60) {
    return `${Math.floor(minutes)} minutes ago`;
  } else if (hours < 24) {
    return `${Math.floor(hours)} hours ago`;
  } else if (days < 30) {
    return `${Math.floor(days)} days ago`;
  } else if (months < 12) {
    return `${Math.floor(months)} months ago`;
  } else {
    return `${Math.floor(years)} years ago`;
  }
};

export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  } else {
    return num.toString();
  }
}

export function formatDate(date: Date): string {
  // Function to get the ordinal suffix for the day
  function getOrdinalSuffix(day: number): string {
      if (day >= 11 && day <= 13) return day + 'th';
      switch (day % 10) {
          case 1: return day + 'st';
          case 2: return day + 'nd';
          case 3: return day + 'rd';
          default: return day + 'th';
      }
  }

  // Array of month names
  const monthNames: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Extract day, month, and year from the Date object
  const day: number = date.getDate();
  const month: string = monthNames[date.getMonth()];
  const year: number = date.getFullYear();

  // Return formatted date string
  return `${getOrdinalSuffix(day)} ${month}, ${year}`;
}

export function formUrl({params, key, value}: {params: string, key: string, value: string | null}): string {
  const url = queryString.parse(params);
  url[key] = value;
  return queryString.stringifyUrl({
    url: window.location.pathname,
    query: url
  }, {skipNull: true});
}

export function removeKeysInQuery({params, keys}: {params: string, keys: string[]}): string {
  const url = queryString.parse(params);
  keys.forEach(key => delete url[key]);
  return queryString.stringifyUrl({
    url: window.location.pathname,
    query: url
  }, {skipNull: true});
}