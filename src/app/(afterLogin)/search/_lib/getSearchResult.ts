import { QueryFunction } from "@tanstack/query-core";
import { Post } from "@/model/Post";

export const getSearchResult: QueryFunction<
  Post[],
  [_1: string, _2: string, searchParams: { q: string; pf?: string; f?: string }]
> = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey;
  const urlSearchParams = new URLSearchParams(searchParams);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${
      searchParams.q
    }?${urlSearchParams.toString()}`,
    {
      next: {
        tags: ["posts", "search", searchParams.q],
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
