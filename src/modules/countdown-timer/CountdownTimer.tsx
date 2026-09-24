/**
 * @file CountdownTimer.tsx
 * @description 카운트다운 타이머 — 스펙: docs/specs/countdown-timer.md.
 *   서버/클라이언트 시간 불일치로 인한 hydration mismatch를 피하기 위해, 마운트 전에는
 *   "로딩 중" placeholder만 보여주고 실제 카운트다운은 useEffect(클라이언트 전용)에서 시작한다.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
"use client";

import { useEffect, useState } from "react";
import type { CountdownTimerProps } from "./schema";
import styles from "./CountdownTimer.module.css";

type Remaining = { days: number; hours: number; minutes: number; seconds: number } | "ended";

/** 종료 시각까지 남은 시간을 지금 이 순간 기준으로 다시 계산한다 (누적 오차 없음) */
function computeRemaining(endAt: string): Remaining {
  const diff = new Date(endAt).getTime() - Date.now();
  if (diff <= 0) return "ended";

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function CountdownTimer({
  endAt,
  endedLabel = "이벤트가 종료되었습니다",
}: CountdownTimerProps) {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    // lazy initializer로 옮길 수 없다 — 서버(SSR)에서는 절대 실제 시간을 계산하면 안 되고
    // (hydration mismatch의 원인), 마운트 후 클라이언트에서만 최초 1회 계산해야 한다.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 위 이유로 의도된 패턴
    setRemaining(computeRemaining(endAt));
    const timer = setInterval(() => {
      setRemaining(computeRemaining(endAt));
    }, 1000);
    return () => clearInterval(timer);
  }, [endAt]);

  if (remaining === null) {
    return (
      <p className={styles.timer} aria-live="off">
        남은 시간 확인 중...
      </p>
    );
  }

  if (remaining === "ended") {
    return (
      <p className={styles.timer} aria-live="off">
        {endedLabel}
      </p>
    );
  }

  return (
    <p className={styles.timer} aria-live="off">
      {remaining.days > 0 && `${remaining.days}일 `}
      {pad(remaining.hours)}:{pad(remaining.minutes)}:{pad(remaining.seconds)}
    </p>
  );
}
