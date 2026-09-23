/**
 * @file exhibitions.ts
 * @description data/exhibitions/*.json 파일을 읽고 검증하는 서버 전용 유틸.
 *   DB 없이 파일시스템을 데이터 소스로 쓴다 — 이 프로젝트의 핵심 전제.
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { ExhibitionSchema, type Exhibition } from "@/lib/exhibition-schema";

const EXHIBITIONS_DIR = path.join(process.cwd(), "data", "exhibitions");

/** data/exhibitions/*.json 파일명(확장자 제외)을 전부 나열한다 — generateStaticParams용 */
export async function listExhibitionIds(): Promise<string[]> {
  const files = await readdir(EXHIBITIONS_DIR);
  return files.filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));
}

/**
 * id에 해당하는 기획전 JSON을 읽어 ExhibitionSchema로 검증한다.
 * 파일이 없거나 스키마가 안 맞으면 null을 반환한다(페이지에서 notFound() 처리하도록).
 */
export async function getExhibition(id: string): Promise<Exhibition | null> {
  try {
    const raw = await readFile(path.join(EXHIBITIONS_DIR, `${id}.json`), "utf-8");
    const parsed = ExhibitionSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
