/**
 * @file page.tsx
 * @description 기획전 상세 페이지 — data/exhibitions/{id}.json을 읽어 SectionRenderer로
 *   렌더링한다. "JSON 파일만 추가하면 새 기획전 페이지가 뜬다" 요구사항의 진입점.
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionRenderer } from "@/SectionRenderer";
import { getExhibition, listExhibitionIds } from "@/lib/exhibitions";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ id: string }>;
};

/** 빌드 시 data/exhibitions/*.json 각각을 정적 페이지로 미리 생성한다 */
export async function generateStaticParams() {
  const ids = await listExhibitionIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const exhibition = await getExhibition(id);
  if (!exhibition) return {};
  return { title: exhibition.title };
}

export default async function ExhibitionPage({ params }: PageProps) {
  const { id } = await params;
  const exhibition = await getExhibition(id);

  if (!exhibition) notFound();

  // 기획전별 강조색(theme.accent)을 CSS 변수로 내려준다 — 모듈은
  // var(--exhibition-accent, var(--color-accent))로 참조해 기본값과 함께 쓴다.
  const themeStyle = exhibition.theme?.accent
    ? ({ "--exhibition-accent": exhibition.theme.accent } as CSSProperties)
    : undefined;

  return (
    <article style={themeStyle}>
      <header className={styles.header}>
        <h1>{exhibition.title}</h1>
        <p className={styles.period}>
          {exhibition.period.start} ~ {exhibition.period.end}
        </p>
      </header>
      <SectionRenderer sections={exhibition.sections} />
    </article>
  );
}
