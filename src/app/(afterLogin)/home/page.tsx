import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import style from "./home.module.css";
import TabDecider from "./_component/TabDecider";
import { Suspense } from "react";
import Loading from "@/app/(afterLogin)/home/loading";

export default async function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab /> {/* 탭전환 onclick - context api */}
        <PostForm />
        <Suspense fallback={<Loading />}>
          <TabDecider /> {/* 탭전환시 화면 - context api */}
        </Suspense>
      </TabProvider>
    </main>
  );
}
