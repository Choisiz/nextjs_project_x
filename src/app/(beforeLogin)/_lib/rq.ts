"use server";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const validateFormData = (formData: FormData) => {
  if (!formData.get("id")?.toString().trim()) return "no_id";
  if (!formData.get("name")?.toString().trim()) return "no_name";
  if (!formData.get("password")?.toString().trim()) return "no_password";
  if (!formData.get("image")) return "no_image";
  return null;
};

const createUser = async (formData: FormData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    }
  );

  if (response.status === 403) return "user_exists";
  return null;
};

export default async (
  prevState: { message: string | null },
  formData: FormData
): Promise<any> => {
  const validationMessage = validateFormData(formData);
  if (validationMessage) return { message: validationMessage };

  try {
    const userCreationError = await createUser(formData);
    if (userCreationError) return { message: userCreationError };

    await signIn("credentials", {
      username: formData.get("id") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    redirect("/home");
  } catch (e) {
    console.log(e);
    return { message: null };
  }
};
