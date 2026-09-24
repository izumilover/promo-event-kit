/**
 * @file route.ts
 * @description 이벤트 응모 mock Route Handler — 스펙: docs/specs/event-entry-form.md.
 *   인증/세션이 없는 프로젝트라 eventId+연락처 조합으로 중복 응모를 판단하는 mock이다
 *   (서버 재시작 시 초기화됨).
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { NextResponse } from "next/server";

const submittedEntries = new Set<string>();

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { eventId, name, phone } = body ?? {};

  if (
    typeof eventId !== "string" ||
    typeof name !== "string" ||
    typeof phone !== "string" ||
    !eventId ||
    !name ||
    !phone
  ) {
    return NextResponse.json({ status: "error" }, { status: 400 });
  }

  const key = `${eventId}:${phone}`;
  if (submittedEntries.has(key)) {
    return NextResponse.json({ status: "duplicate" });
  }

  submittedEntries.add(key);
  return NextResponse.json({ status: "submitted" });
}
