# VideoBlock 스펙

> 작성: kamiz · 2026-09-28 · P2(여유분)

## 개요

유튜브/비메오 등 외부 영상을 반응형(16:9)으로 임베드하는 정적 모듈.

## Props

```typescript
type VideoBlockProps = {
  /** 임베드용 URL (예: https://www.youtube.com/embed/VIDEO_ID) */
  embedUrl: string;
  /** iframe title — 스크린리더가 영상 내용을 알 수 있게 필수 */
  title: string;
};
```

## 설계 결정 — embed URL을 그대로 받는다

일반 유튜브 시청 URL(`youtube.com/watch?v=...`)이 아니라 **임베드 전용 URL**
(`youtube.com/embed/...`)을 그대로 받는다. URL 파싱/변환 로직을 모듈에 넣지 않아
"모듈은 props만 받는다" 원칙을 지키고, 어떤 영상 플랫폼이든(유튜브/비메오 등) 임베드
URL 형식만 맞으면 그대로 동작한다 — 변환은 JSON 작성 시점에 사람이 한다.

## 상태

- 정적 콘텐츠라 별도 상태 없음(로딩/에러 상태는 브라우저의 iframe 기본 동작에 위임)

## 반응형

- `aspect-ratio: 16/9`인 wrapper 안에 iframe을 `width:100%; height:100%`로 채운다 —
  화면 폭에 관계없이 항상 16:9 비율 유지

## 접근성

- `title`은 필수(스키마에서 강제) — `<iframe title={title}>`로 전달
- `allowFullScreen` 활성화(영상 전체화면 시청은 접근성 편의 기능)

## 예외 케이스

- `embedUrl`이 실제로 존재하지 않는 영상을 가리켜도 모듈 레벨에서는 검증하지 않는다
  (외부 서비스 가용성까지는 스코프 밖) — iframe이 그 서비스의 자체 에러 화면을 보여준다
