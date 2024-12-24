"use client";

import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "@/app/(afterLogin)/home/home.module.css";

export default function PostRecommends() {
  //isFetching: 데이터를 가져온순간 =t
  //isPending: 초기에,데이터를 가져오지 않았을때 =  t
  //isLoading: isPending && isFetching
  const { data, hasNextPage, fetchNextPage, isFetching, isPending } =
    useSuspenseInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["posts", "recommends"],
      queryFn: getPostRecommends, //todo: 다음페이지 불러오는 함수, 불러올떄마다 isFetching true
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

  if (isPending) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          className={styles.loader}
          height="100%"
          viewBox="0 0 32 32"
          width={40}
        >
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
          ></circle>
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{
              stroke: "rgb(29, 155, 240)",
              strokeDasharray: 80,
              strokeDashoffset: 60,
            }}
          ></circle>
        </svg>
      </div>
    );
  }

  console.log("data", data);
  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
      {/*이게 보이기 시작하면 fetchNextPage를 호출 */}
    </>
  );
}
