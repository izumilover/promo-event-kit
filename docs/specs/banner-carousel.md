# BannerCarousel 스펙

> 작성: kamiz · 2026-09-23 · 브랜치: `feat/display-modules` (B)

## 개요

여러 프로모션 카드를 자동 로테이션으로 보여주는 캐러셀. 상호작용(자동재생/이전·다음/일시정지)이
있으므로 이 모듈만 `"use client"`.

## Props

```typescript
type BannerCarouselSlide = {
  id: string;
  title: string;
  periodLabel?: string;
  badge?: string; // 예: "한정 수량"
  href?: string;
  image: { pc: string; mo: string; alt: string };
};

type BannerCarouselProps = {
  slides: BannerCarouselSlide[];
  /** 자동재생 간격(ms). 없으면 자동재생 안 함 */
  autoplayInterval?: number;
};
```

## 상태

- `slides`가 1개면 캐러셀 컨트롤(이전/다음/인디케이터) 없이 단일 배너처럼 렌더링
- `slides`가 빈 배열이면 아무것도 렌더링하지 않는다(zod에서 `min(1)`으로 막을지, 컴포넌트에서
  방어할지는 구현 시 결정 — 우선 컴포넌트에서 방어)
- 자동재생 중 사용자가 이전/다음을 누르면 타이머 리셋
- 일시정지 버튼을 누르면 자동재생 중지, 다시 누르면 재개(토글)

## 반응형

- 768px 미만: `image.mo`, 슬라이드당 1장 전체폭
- 768px 이상: `image.pc`

## 접근성 (필수 — 문서 체크포인트)

- **일시정지 버튼 필수** — 자동재생 콘텐츠는 WCAG 2.2.2(Pause, Stop, Hide) 대상
- 키보드로 이전/다음 조작 가능(버튼 포커스 가능, Enter/Space로 동작)
- 캐러셀 전체에 `aria-roledescription="carousel"`, 각 슬라이드에 `aria-label="N/전체"` 부여
- 자동재생 중이어도 `prefers-reduced-motion: reduce`면 자동재생 비활성화

## 예외 케이스

- `autoplayInterval`이 너무 작은 값(예: 100ms)이면 실사용상 문제지만 스키마에서 최소값(예:
  2000ms) 정도만 강제하고 그 이상은 구현자 재량
