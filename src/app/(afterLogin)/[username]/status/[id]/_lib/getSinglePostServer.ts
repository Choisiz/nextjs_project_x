import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const getSinglePostServer = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_1, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
    {
      next: {
        revalidate: 3600,
        tags: ["posts", id],
      },
      credentials: "include",
      headers: { Cookie: cookies().toString() },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
