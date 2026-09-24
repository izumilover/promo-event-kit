# CountdownTimer 스펙

> 작성: kamiz · 2026-09-24 · 브랜치: `feat/event-modules` (D)

## Props

```typescript
type CountdownTimerProps = {
  /** ISO 8601 종료 시각 */
  endAt: string;
  /** 종료 후 표시할 문구 */
  endedLabel?: string; // 기본 "이벤트가 종료되었습니다"
};
```

## 상태

- 종료 전: `HH:MM:SS` 또는 `D일 HH:MM:SS` 카운트다운
- 종료 시각 도달: `endedLabel`로 전환, 타이머 정지

## Hydration 안전성 (필수 체크포인트)

서버가 렌더링한 시각과 클라이언트가 처음 그리는 시각이 다르면 hydration mismatch 경고가 난다.
해결: **서버 렌더링(첫 페인트)에서는 고정 placeholder만 보여주고, `useEffect`(마운트 후,
클라이언트 전용)에서 실제 `Date.now()` 기준 남은 시간을 계산해 그때부터 상태를 채운다.**
그 전까지는 `aria-hidden`이 아니라 "로딩 중" 텍스트를 명시적으로 보여준다(빈 화면 X).

## 접근성

- 1초마다 갱신되는 숫자를 `aria-live="off"`로 유지 — `polite`/`assertive`로 두면 스크린리더가
  매초 읽어서 방해가 된다. 남은 시간이 24시간 미만으로 들어올 때 등 의미 있는 전환에서만
  선택적으로 안내하는 건 스코프 밖(단순화)

## 예외 케이스

- `endAt`이 과거 시각이면 마운트 즉시 `endedLabel` 표시(카운트다운 없이)
- 탭이 백그라운드에 있다가 돌아왔을 때도 `Date.now()` 재계산이라 오차 누적 없음(경과시간
  누적 방식이 아니라 항상 "지금 - 종료시각"을 다시 계산)
