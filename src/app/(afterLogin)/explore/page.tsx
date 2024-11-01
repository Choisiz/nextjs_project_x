import style from "./explore.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import Trend from "../_component/Trend";

export default function Home() {
  return (
    <div className={style.main}>
      <div className={style.formZone}>
        <SearchForm />
      </div>
      <div className={style.trend}>
        <h3>나를 위한 추천</h3>
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    </div>
  );
}
