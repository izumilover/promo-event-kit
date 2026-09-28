# ImageMap 스펙

> 작성: kamiz · 2026-09-28 · P2(여유분)

## 개요

이미지 위에 여러 클릭 가능 영역(핫스팟)을 두는 모듈 — 예: 상품 배치도 이미지에서 각 상품
위치를 클릭하면 해당 상품 상세로 이동.

## 설계 결정 — 네이티브 `<map>`/`<area>` 사용

커스텀 좌표 기반 오버레이(div + position:absolute)를 직접 만드는 대신, 브라우저 네이티브
`<map>`/`<area>` 엘리먼트를 쓴다. 이러면 별도 JS 이벤트 핸들러 없이도 클릭이 그냥 동작하고
(서버 컴포넌트로 구현 가능), `<area alt>`가 스크린리더에 자동으로 읽힌다.

## Props

```typescript
type ImageMapArea = {
  /** 픽셀 좌표 "x1,y1,x2,y2" (rect 기준) */
  coords: string;
  href: string;
  /** 스크린리더용 설명 — 필수 */
  alt: string;
};

type ImageMapProps = {
  image: { src: string; width: number; height: number; alt: string };
  areas: ImageMapArea[];
};
```

`width`/`height`를 필수로 받는 이유: `<img usemap>`은 원본 이미지 픽셀 좌표 기준으로
`coords`를 해석하므로, 이미지를 CSS로 축소해도 좌표 기준(원본 크기)을 알아야 한다.

## 상태

- `areas`가 빈 배열이면 이미지만 보여주고(핫스팟 없이), 별도 렌더링 실패로 취급하지 않는다

## 접근성

- 모든 `<area>`에 `alt` 필수(스키마 강제)
- 이미지 자체에도 `alt`를 두되, `areas`가 있으면 `alt=""`로 비워 스크린리더가 중복으로
  안 읽게 한다(핫스팟 설명이 실질적인 내용을 대신하므로)

## 예외 케이스

- 반응형 리사이즈 시 좌표가 이미지 표시 크기와 어긋나는 문제는 스코프 밖으로 둔다(원본
  픽셀 크기로만 정확히 동작 — CSS로 이미지 폭을 줄이면 핫스팟 위치가 실제 이미지 대비
  비례해서 어긋나지 않는 것은 브라우저가 처리하지만, 완벽한 반응형 동작을 보장하지는 않음)
