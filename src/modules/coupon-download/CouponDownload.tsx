/**
 * @file CouponDownload.tsx
 * @description 쿠폰 발급 목록 — 스펙: docs/specs/coupon-download.md.
 *   mock Route Handler(POST /api/coupons)를 호출해 발급 상태를 갱신한다.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import type { Coupon, CouponDownloadProps } from "./schema";
import styles from "./CouponDownload.module.css";

type ClaimState = "idle" | "loading" | "claimed" | "sold-out" | "already-claimed" | "error";

const RESULT_LABEL: Record<ClaimState, string> = {
  idle: "",
  loading: "",
  claimed: "발급 완료",
  "sold-out": "쿠폰이 모두 소진되었습니다",
  "already-claimed": "이미 발급받은 쿠폰입니다",
  error: "잠시 후 다시 시도해주세요",
};

const formatter = new Intl.NumberFormat("ko-KR");

function couponLabel(coupon: Coupon) {
  const discount = `${formatter.format(coupon.amount)}원 할인`;
  const condition = coupon.minPrice ? ` (${formatter.format(coupon.minPrice)}원 이상 구매 시)` : "";
  return `${discount}${condition}`;
}

export function CouponDownload({ coupons }: CouponDownloadProps) {
  const [states, setStates] = useState<Record<string, ClaimState>>({});

  if (coupons.length === 0) return null;

  async function claim(couponId: string) {
    setStates((prev) => ({ ...prev, [couponId]: "loading" }));
    try {
      const response = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ couponId }),
      });
      const data = await response.json();
      setStates((prev) => ({ ...prev, [couponId]: data.status as ClaimState }));
    } catch {
      setStates((prev) => ({ ...prev, [couponId]: "error" }));
    }
  }

  return (
    <ul className={styles.list}>
      {coupons.map((coupon) => {
        const state = states[coupon.id] ?? "idle";
        const claimed = state === "claimed" || state === "already-claimed";
        return (
          <li className={styles.item} key={coupon.id}>
            <span className={styles.label}>{couponLabel(coupon)}</span>
            <Button
              variant={claimed ? "secondary" : "primary"}
              size="sm"
              disabled={state === "loading" || claimed || state === "sold-out"}
              onClick={() => claim(coupon.id)}
            >
              {state === "loading" ? "발급 중..." : claimed ? "발급 완료" : "다운로드"}
            </Button>
            <span role="status" aria-live="polite" className={styles.result}>
              {RESULT_LABEL[state]}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
