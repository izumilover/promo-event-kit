# EventEntryForm 스펙

> 작성: kamiz · 2026-09-24 · 브랜치: `feat/event-modules` (D)

## 개요

이벤트 응모 폼. 이름/연락처 등 최소 항목 + 개인정보 수집 동의 체크박스. 제출은 mock Route
Handler로 보내고, 같은 브라우저에서 중복 제출을 막는다(서버가 세션/로그인 없이도 판단할 수
있는 유일한 방법이 클라이언트측 표시이므로 — 진짜 중복 방지는 실제 인증이 생긴 뒤의 일).

## Props

```typescript
type EventEntryFormProps = {
  eventId: string;
  /** 응모 항목 — 이번 구현은 이름+연락처 고정, fields는 향후 확장 여지로만 남겨둠 */
  privacyNotice: string; // 개인정보 수집·이용 동의 문구
};
```

## Mock API

`POST /api/event-entries` — body `{ eventId, name, phone }`
- 응답 `{ status: "submitted" }`
- 서버가 in-memory Set으로 `eventId+phone` 조합을 기억해뒀다가 같은 값이 다시 오면
  `{ status: "duplicate" }` 반환(서버 재시작 시 초기화되는 mock)

## 상태

- 폼 검증: 이름(필수, 1자 이상), 연락처(필수, 숫자+하이픈 형식), 동의 체크박스(필수) —
  `react-hook-form` + `zod`
- 제출 성공: 폼을 성공 메시지로 교체(재제출 UI 자체를 없앰)
- 중복 응모: 폼 위에 "이미 응모하셨습니다" 안내, 폼은 유지(사용자가 정보를 고칠 수도 있으니
  막지 않음)

## 접근성

- 각 입력 필드에 `<label htmlFor>` 연결, 에러 메시지는 `aria-describedby`로 필드와 연결
- 동의 체크박스 없이 제출 시도하면 포커스가 그 체크박스로 이동

## 예외 케이스

- 동의 문구(`privacyNotice`)가 비어있으면 스키마 검증에서 막는다(운영 실수 방지 — 동의 문구
  없이 개인정보를 받으면 안 됨)
