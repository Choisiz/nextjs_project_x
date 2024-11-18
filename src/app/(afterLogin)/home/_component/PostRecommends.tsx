"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function PostRecommends() {
  //데이터 서버(msw)에서 가져오기
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
    isLoading, // isPending && isFetching
    isError,
  } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends, //todo: 다음페이지 불러오는 함수
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000, //todo: 0초뒤에 fresh에서 stale로
    gcTime: 300 * 1000, //todo: 메모리 많아지면 정리하는것, staleTime보다 더 길게 해야함
  });

  const { ref, inView } = useInView({
    threshold: 0, //몇 픽셀
    delay: 2, //몇 초후
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  //인피니티 스크롤: 같은 컴포넌트내에서만 캐시가 저장되서 스크롤복원이 됨

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }}></div>
      {/*이게 보이기 시작하면 fetchNextPage를 호출 */}
    </>
  );
}
