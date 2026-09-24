/**
 * @file route.ts
 * @description 쿠폰 발급 mock Route Handler — 스펙: docs/specs/coupon-download.md.
 *   실제 결제/로그인이 없는 프로젝트라 발급 상태를 서버 메모리에만 기록한다
 *   (서버 재시작 시 초기화되는 mock — 실제 재고 관리가 아니다).
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { NextResponse } from "next/server";

/** 이번 서버 프로세스가 살아있는 동안만 유지되는 발급 기록 */
const claimedCoupons = new Set<string>();

/** couponId에 "soldout"이 포함되면 항상 품절 응답을 보내는 데모용 규칙 */
function isSoldOut(couponId: string) {
  return couponId.includes("soldout");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const couponId = body?.couponId;

  if (typeof couponId !== "string" || couponId.length === 0) {
    return NextResponse.json({ status: "error" }, { status: 400 });
  }

  if (isSoldOut(couponId)) {
    return NextResponse.json({ status: "sold-out" });
  }

  if (claimedCoupons.has(couponId)) {
    return NextResponse.json({ status: "already-claimed" });
  }

  claimedCoupons.add(couponId);
  return NextResponse.json({ status: "claimed" });
}
