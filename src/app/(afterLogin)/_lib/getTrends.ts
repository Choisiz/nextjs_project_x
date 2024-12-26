export async function getTrends() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hashtags/trends`,
    {
      next: {
        tags: ["trends"],
      },
      credentials: "include",
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("faild fetch data");
  }

  return res.json();
}
