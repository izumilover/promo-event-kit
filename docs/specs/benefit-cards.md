# BenefitCards 스펙

> 작성: kamiz · 2026-09-23 · 브랜치: `feat/display-modules` (B)

## 개요

카드할인·사은품·멤버십 등 혜택을 아이콘+타이틀+설명 카드 그리드로 보여주는 정적 모듈.
상호작용이 없으므로 서버 컴포넌트로만 구현한다.

## Props

```typescript
type BenefitCard = {
  icon: string; // 아이콘 식별자 또는 이미지 경로 — 구현 시 아이콘 세트 확정 필요
  title: string;
  description: string;
};

type BenefitCardsProps = {
  items: BenefitCard[];
};
```

## 상태

- `items` 1~2개: 2열
- `items` 3~4개: 4열 자동 배치(설계 원칙의 "2~4열 자동 배치")
- `items`가 빈 배열이면 섹션 자체를 렌더링하지 않는다(SectionRenderer가 빈 결과를 그대로
  Section으로 감싸면 빈 여백만 남으므로, 컴포넌트가 `null` 반환)

## 반응형

- 768px 미만: 2열 고정
- 768px 이상: `items.length`에 따라 2~4열

## 접근성

- 카드 전체가 클릭 가능한 링크가 아님(순수 정보 카드) — 링크가 필요해지면 별도 논의
- 아이콘은 장식용이면 `aria-hidden`, 의미 전달용이면 `alt`/`aria-label` 부여(아이콘 세트 확정 시
  결정)

## 예외 케이스

- `icon` 값이 실제 아이콘 세트에 없는 키면: 개발 모드에서 콘솔 경고 + 기본 아이콘(placeholder)
  표시 — SectionRenderer 레벨의 "섹션째로 건너뛰기"와는 별개로, 카드 하나만의 문제이므로 카드
  단위로 폴백 처리
