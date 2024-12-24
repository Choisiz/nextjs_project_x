export async function getFollowingPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/followRecommends`,
    {
      next: {
        tags: ["posts", "followings"],
      },
      cache: "no-store",
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
