import { ReactNode } from "react";
import styles from "@/app/(beforeLogin)/_component/main.module.css";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function Layout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      {children} {/*일반페이지 */}
      {modal} {/*모달페이지 */}
    </div>
  );
}

// 주소가 localhost:3000: children-> page.tsx, modal->@modal/default.tsx
// 주소가 localhost:3000/i/flow/login: chldren-> i/flow/login/page.tsx, modal->@modal/i/flow/login/page.tsx
