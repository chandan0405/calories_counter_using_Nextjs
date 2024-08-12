"use client";
import MainContainerComponent from "@/components/MainContainerComponent"
import styles from "./page.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className={styles["home-container"]}>
      <MainContainerComponent />
    </div>
  );
}
