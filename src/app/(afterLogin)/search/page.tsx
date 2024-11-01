"use client";

import { useSearchParams } from "next/navigation";
import style from "./search.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import Tab from "@/app/(afterLogin)/search/_conponent/Tab";
import Post from "@/app/(afterLogin)/_component/Post";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};
export default function Search() {
  const searchParams = useSearchParams(); // 클라이언트 컴포넌트에서 searchParams를 불러옵니다.
  const q = searchParams.get("q") || ""; // searchParams에서 q 값을 가져옵니다.

  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        {/*<SearchResult searchParams={searchParams} />*/}
      </div>
    </main>
  );
}
