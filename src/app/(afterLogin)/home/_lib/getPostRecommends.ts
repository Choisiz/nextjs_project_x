type Props = { pageParam?: number };

export async function getPostRecommends({ pageParam }: Props) {
  console.log("??", pageParam);
  //todo: 데이터 불러오기
  const res = await fetch(
    `http://localhost:9090/api/postRecommends?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "recommends"],
      },
      //cache:'no-store' //todo: 캐싱을 하기 싫다면
    }
  );
  if (!res.ok) {
    throw new Error("faild error");
  }

  //todo: 태그에 대한 데이터를 새로고침
  //revalidateTag("posts");
  //todo: 페이지에 대한 전체데이터를 새로고침
  //revalidatePath("/home");

  return res.json();
}
