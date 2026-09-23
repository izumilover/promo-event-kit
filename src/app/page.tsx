import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>기획전·이벤트 모듈 카탈로그</h1>
      <p>
        <code>data/exhibitions/*.json</code> 설정을 조립해 렌더링하는 데모 앱입니다. 샘플 기획전
        페이지는 준비 중입니다.
      </p>
    </main>
  );
}
