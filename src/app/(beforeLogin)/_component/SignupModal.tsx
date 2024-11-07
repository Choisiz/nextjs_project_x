import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./signup.module.css";
import { redirect, useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

export default function SignupModal() {
  const submit = async (formData: FormData): Promise<any> => {
    "use server";
    if (!formData.get("id")) {
      return { message: "no_id" };
    }
    if (!formData.get("name")) {
      return { message: "no_name" };
    }
    if (!formData.get("password")) {
      return { message: "no_password" };
    }
    if (!formData.get("image")) {
      return { message: "no_image" };
    }
    let shouldRedirect = false;
    try {
      //api호출도 하고있지만, db접근도 가능
      const response: Response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
        {
          method: "post",
          body: formData,
          credentials: "include",
        }
      );
      console.log(response.status);
      if (response.status === 403) {
        return { message: "user_exists" };
      }
      console.log(await response.json());
      shouldRedirect = true;
    } catch (e) {
      console.log(e);
    }
    if (shouldRedirect) {
      redirect("/home");
    }
  };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={submit}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  name="id"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input
                  id="name"
                  name="name"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  className={style.input}
                  type="password"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input
                  id="image"
                  name="image"
                  className={style.input}
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button type="submit" className={style.actionButton}>
                가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
