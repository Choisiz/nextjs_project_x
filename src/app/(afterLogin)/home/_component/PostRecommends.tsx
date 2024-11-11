"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";

export default function PostRecommends() {
  //데이터 서버(msw)에서 가져오기
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, //todo: 0초뒤에 fresh에서 stale로
    gcTime: 300 * 1000, //todo: 메모리 많아지면 정리하는것, staleTime보다 더 길게 해야함
  });
  return (
    <>
      {data?.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </>
  );
}
