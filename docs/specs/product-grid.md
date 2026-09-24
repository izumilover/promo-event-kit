# ProductGrid / ProductSlider 스펙

> 작성: kamiz · 2026-09-24 · 브랜치: `feat/product-modules` (C)

## 개요

상품 목록을 그리드(ProductGrid) 또는 가로 스크롤 슬라이더(ProductSlider)로 보여준다. 둘 다
`ProductCard`(공통 UI, `src/components/ui/ProductCard`)를 공유해서 카드 마크업이 중복되지
않는다.

## 설계 결정 — productIds 대신 products 배열을 직접 받는다

문서(`docs/plan.md`)의 JSON 예시는 `productIds: ["P001", "P002"]`처럼 ID만 넘기고 서버
컴포넌트가 조회해서 채워주는 모양이었다. 이 프로젝트는 실제 DB/상품 API가 없으므로(자체 DB
없음 원칙), ID 조회 레이어를 새로 만드는 대신 **기획전 JSON의 section props에 상품 데이터를
직접 기술**한다. "모듈은 props만 받는다"는 원칙은 그대로 지키면서, 조회 계층만 생략한 것 —
나중에 실제 상품 API가 생기면 `productIds`를 받아 조회 후 이 컴포넌트에 넘기는 서버 컴포넌트
한 겹만 추가하면 된다(ProductGrid/ProductSlider 자체는 수정 불필요).

## Props

```typescript
type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: { src: string; alt: string };
  href?: string;
};

type ProductGridProps = {
  products: Product[];
  columns?: 2 | 3 | 4; // 기본 4
  showPrice?: boolean; // 기본 true
};

type ProductSliderProps = {
  products: Product[];
  showPrice?: boolean; // 기본 true
};
```

## 상태

- `products`가 빈 배열이면 섹션을 렌더링하지 않는다(`null` 반환)
- `showPrice: false`면 `ProductCard`가 `Price`를 렌더링하지 않는다(카드 자체는 유지)

## 반응형

- ProductGrid: 768px 미만 2열 고정, 이상은 `columns` prop 값(2~4)
- ProductSlider: 항상 가로 스크롤(모바일/PC 공통), 카드 폭만 브레이크포인트에 따라 조정

## 접근성

- ProductSlider는 네이티브 `overflow-x: auto` + `scroll-snap-type`로 구현 — 커스텀 JS 캐러셀
  대신 브라우저 기본 스크롤 키보드 조작(Tab, 화살표, PageUp/Down)을 그대로 활용한다
- 이전/다음 버튼도 함께 제공(마우스/터치 사용자용), 버튼은 `aria-label`로 방향 명시
- `ProductCard` 전체가 `href`가 있으면 링크, 없으면 비링크 카드(가격만 보여주는 경우 등)

## 예외 케이스

- `originalPrice`가 `price`보다 작거나 같으면 `Price` 컴포넌트가 이미 할인율을 표시 안 하므로
  이 모듈에서 별도 처리 불필요
- 상품 이미지가 없는 경우는 스펙 밖(모든 상품은 `image` 필수로 스키마에서 강제)
