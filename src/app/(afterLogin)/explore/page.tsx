import style from "./explore.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import TrendSection from "./_component/TrendSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "탐색하기 / X",
  description: "탐색해보세요.",
};
export default function Home() {
  return (
    <div className={style.main}>
      <div className={style.formZone}>
        <SearchForm />
      </div>
      <div className={style.trend}>
        <h3>나를 위한 트랜드 - 탐색하기</h3>
        <TrendSection />
      </div>
    </div>
  );
}
