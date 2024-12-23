import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";

export default async function TabDeciderSuspense() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"], //todo: 이두개의 키값이 있을경우에는
    queryFn: getPostRecommends, //todo: 이 함수를 실행해라
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);
  //todo: 서버에서 온 데이터를 클라이언트에서 그래로 형식에 맞춰 물려받는것

  //todo: 데이터 클라이언트에서 사용하기
  //queryClient.getQueryData(["posts", "recommends"]);
  //todo: 데이터 클라이언트에서 수정하기
  //queryClient.setQueryData();

  return (
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  );
}
