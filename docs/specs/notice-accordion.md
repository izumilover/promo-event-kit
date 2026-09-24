# NoticeAccordion 스펙

> 작성: kamiz · 2026-09-24 · 브랜치: `feat/event-modules` (D)

## 개요

유의사항 등 긴 텍스트를 접었다 펼 수 있는 아코디언. P0(필수) 모듈이지만 이벤트 계열과 함께
D 브랜치에서 구현한다(CLAUDE.md 브랜치 표 기준).

## Props

```typescript
type NoticeAccordionProps = {
  items: string[];
  defaultOpen?: boolean; // 기본 false
};
```

## 상태

- `items`가 빈 배열이면 렌더링하지 않는다
- 펼침/접힘은 컴포넌트 내부 상태 하나로 전체를 토글(항목별 개별 토글 아님 — 스펙 단순화)

## 접근성 (필수)

- 트리거는 `<button aria-expanded={open}>`, 콘텐츠 영역은 `id`로 연결하고 트리거에
  `aria-controls`
- 콘텐츠가 닫혀 있을 때 `hidden` 속성으로 완전히 숨김(스크린리더 포함)

## 예외 케이스

- 항목 텍스트가 매우 길어도(줄바꿈 포함) 그대로 렌더링 — 별도 줄임 처리 없음
