import style from "./explore.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import TrendSection from "./_component/TrendSection";

export default function Home() {
  return (
    <div className={style.main}>
      <div className={style.formZone}>
        <SearchForm />
      </div>
      <div className={style.trend}>
        <h3>나를 위한 트랜드</h3>
        <TrendSection />
      </div>
    </div>
  );
}
