# ShareBar 스펙

> 작성: kamiz · 2026-09-24 · 브랜치: `feat/event-modules` (D)

## Props

```typescript
type ShareChannel = "kakao" | "facebook" | "url";

type ShareBarProps = {
  channels: ShareChannel[];
};
```

## 상태

- `url` 채널 클릭: 현재 페이지 URL을 클립보드에 복사하고 토스트("링크가 복사되었습니다")를
  잠깐 보여준다
- `kakao`/`facebook`: 실제 SDK 연동은 스코프 밖(로그인/앱키 필요) — 클릭 시 알림으로
  "연동 준비 중"만 표시(mock). 실제 서비스 붙일 때 이 부분만 교체
- 클립보드 API(`navigator.clipboard`)가 없는 환경(구형 브라우저, 비보안 컨텍스트)이면
  `execCommand` fallback 없이 에러 토스트만 표시(스코프 단순화)

## 접근성

- 각 채널 버튼에 `aria-label`(예: "URL 복사")
- 토스트는 `role="status"` + `aria-live="polite"`로 스크린리더에도 알림

## 예외 케이스

- `channels`가 빈 배열이면 렌더링하지 않는다
