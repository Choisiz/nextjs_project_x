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
        <Tab />
        <PostForm />
        <Suspense fallback={<Loading />}>
          <TabDecider />
        </Suspense>
      </TabProvider>
    </main>
  );
}
