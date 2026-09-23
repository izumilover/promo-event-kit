# HeroBanner 스펙

> 작성: kamiz · 2026-09-23 · 브랜치: `feat/display-modules` (B)

## 개요

기획전 최상단에 오는 단일 히어로 배너. 제목/부제/기간/CTA와 PC·모바일 별도 배경 이미지를 보여준다.

## Props

```typescript
type HeroBannerProps = {
  title: string;
  subtitle?: string;
  /** 표시용 기간 텍스트 — 실제 노출 제어는 section envelope의 period가 담당, 이건 화면 문구 */
  periodLabel?: string;
  image: {
    pc: string;
    mo: string;
    alt: string;
  };
  cta?: {
    label: string;
    href: string;
  };
};
```

## 상태

- 기본 상태: title + image만 있어도 렌더링 가능(나머지 전부 optional)
- CTA 없음: 버튼 영역 자체를 렌더링하지 않는다(빈 버튼 X)
- 빈 데이터: title이 빈 문자열이면 스키마 검증에서 걸러지므로(min length 1) 컴포넌트 레벨에서
  별도 빈 상태를 처리하지 않는다

## 반응형

- 768px 미만: `image.mo` 사용, 세로형 레이아웃(제목 → 부제 → CTA 순 스택)
- 768px 이상: `image.pc` 사용, 텍스트 오버레이 레이아웃

## 접근성

- `image.alt`는 필수(스키마에서 required)
- 제목은 `<h2>`(페이지 `<h1>`은 기획전 타이틀이 이미 차지 — 히어로 배너의 제목은 그 하위 레벨)
- CTA는 `Button`(href 버전) 재사용 — 새 버튼 마크업 만들지 않는다

## 예외 케이스

- `image.pc`/`image.mo` URL이 깨진 경우: 브라우저 기본 alt 텍스트 표시로 위임(별도 fallback UI
  만들지 않음 — 스코프 밖)
- CTA href가 상대경로/절대경로 둘 다 허용(zod에서 형식 강제하지 않음, 실사용 시 내부 라우트가
  대부분일 것으로 가정)
