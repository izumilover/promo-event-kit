/**
 * @file ShareBar.tsx
 * @description 공유 버튼 바 — 스펙: docs/specs/share-bar.md.
 *   클립보드 복사/토스트 상태가 있어 클라이언트 컴포넌트로 구현한다.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
"use client";

import { useEffect, useState } from "react";
import type { ShareBarProps } from "./schema";
import styles from "./ShareBar.module.css";

const CHANNEL_LABEL: Record<string, string> = {
  kakao: "카카오톡 공유",
  facebook: "페이스북 공유",
  url: "URL 복사",
};

export function ShareBar({ channels }: ShareBarProps) {
  const [toast, setToast] = useState<string | null>(null);

  // 토스트는 2.5초 뒤 자동으로 사라진다("잠깐 보여준다" 스펙)
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  if (channels.length === 0) return null;

  /** url 채널만 실제 동작(클립보드 복사), 나머지는 SDK 연동 전이라 안내만 한다 */
  async function handleClick(channel: string) {
    if (channel !== "url") {
      setToast("연동 준비 중입니다");
      return;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast("링크가 복사되었습니다");
    } catch {
      setToast("복사에 실패했습니다");
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        {channels.map((channel) => (
          <button
            key={channel}
            type="button"
            className={styles.button}
            aria-label={CHANNEL_LABEL[channel]}
            onClick={() => handleClick(channel)}
          >
            {CHANNEL_LABEL[channel]}
          </button>
        ))}
      </div>
      {toast && (
        <p className={styles.toast} role="status" aria-live="polite">
          {toast}
        </p>
      )}
    </div>
  );
}
