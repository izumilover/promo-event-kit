# ReviewCarousel 스펙

> 작성: kamiz · 2026-10-01 · 브랜치: `feat/review-carousel`

## 개요

고객 후기(포토리뷰 포함)를 카드 형태로 가로 스크롤 보여주는 모듈. 자동재생이 없는 단순 스크롤
캐러셀이라는 점에서 `ProductSlider`(`src/modules/product-slider`)와 동일한 패턴을 따른다 —
네이티브 `overflow-x` 스크롤이 조작의 본체이고, 좌우 버튼은 마우스/터치 사용자를 위한 보조
컨트롤이다.

## Server/Client 컴포넌트 판단

**클라이언트 컴포넌트(`"use client"`)로 구현한다.** 카드 자체(별점·텍스트·사진 렌더링)는
상태가 없지만, 좌우 스크롤 버튼이 `scrollRef.current.scrollBy(...)`로 DOM을 직접 조작해야
하므로 이벤트 핸들러가 필요하다. `ProductSlider`가 "네이티브 스크롤은 서버에서도 그릴 수 있지만
버튼 핸들러 때문에 클라이언트가 필요하다"고 판단한 것과 동일한 근거다(`docs/specs/product-grid.md`
접근성 절 참고). 리뷰 카드 목록 자체는 서버에서 내려받은 `reviews` prop을 그대로 매핑만 하므로,
데이터 패칭은 상위 서버 컴포넌트가 그대로 담당하고 이 모듈은 받은 props만 렌더링한다(모듈은
데이터를 직접 안 불러온다는 설계 원칙 준수).

## Props

```typescript
type Review = {
  id: string;
  authorName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
  /** 포토리뷰 — 없으면 텍스트 전용 카드로 렌더링 */
  photo?: { src: string; alt: string };
  /** ISO 날짜 문자열(YYYY-MM-DD) — 카드에는 사람이 읽는 형식으로 변환해 표시 */
  createdAt: string;
};

type ReviewCarouselProps = {
  reviews: Review[];
};
```

- `showRating`/`showPhoto` 같은 노출 토글 prop은 두지 않는다 — 별점과 작성일은 리뷰 신뢰도의
  핵심 정보라 항상 노출, 사진은 애초에 optional field라 있으면 보여주고 없으면 자동으로 생략되는
  구조로 충분하다(`ProductSlider`의 `showPrice`처럼 숨길 이유가 없음)

## 별점 표현 방식 — 별 유니코드 글리프(★/☆) + 접근성 텍스트

**결정**: 별 1~5개를 `★`(채움)/`☆`(빈 별) 유니코드 글리프 5개로 시각 표현하고, 별점 전체를
`aria-hidden="true"`로 감춘 뒤 스크린리더용으로 `별점 4/5`같은 텍스트를 별도로 제공한다.

**근거**:

1. CLAUDE.md "새 라이브러리를 임의로 추가하지 않는다" 원칙상 아이콘 라이브러리(react-icons 등)를
   새로 추가할 수 없다. `benefit-cards/icons.ts`가 이미 유니코드 글리프로 아이콘을 최소 구현한
   선례가 있으므로 동일 패턴을 따른다.
2. 숫자만 표시(`4.0`)하면 시각적으로 즉각 와닿지 않고, 이모지(⭐)는 개수를 5개 늘어놓으면 플랫폼별
   렌더링 크기 차이가 커서 레이아웃이 흔들릴 수 있다. `★`/`☆`는 대부분의 시스템 폰트에서 폭이
   고르고 흑백 글리프라 토큰 기반 색상(`--color-accent`)으로 칠할 수 있어 디자인 토큰 원칙과도
   맞는다(이모지는 색상을 토큰으로 override할 수 없음).
3. 별 5개를 개별 `<span aria-hidden>`으로 나열하면 스크린리더가 "채워진 별, 채워진 별, 채워진
   별, 채워진 별, 빈 별"처럼 읽어 오히려 정보 전달이 나쁘다. `BannerCarousel`이 `aria-label="N/전체"`
   형태로 캐러셀 위치를 한 번에 알리는 것과 같은 맥락으로, 별점도 래퍼에 `aria-label="평점 4점,
5점 만점"` 하나만 주고 내부 글리프는 장식으로 숨긴다.

```typescript
// src/modules/review-carousel/rating.ts (구현 시 파일명 예시)
const FULL_STAR = "★";
const EMPTY_STAR = "☆";
```

## 상태

- `reviews`가 빈 배열이면 섹션을 렌더링하지 않는다(`null` 반환) — `ProductSlider`/`ProductGrid`와
  동일 규칙
- 스크롤 위치에 따른 버튼 비활성화(맨 끝에서 다음 버튼 disable 등)는 하지 않는다 — `ProductSlider`도
  이 로직이 없고, 네이티브 스크롤이라 끝에 도달하면 스크롤 자체가 멈추므로 버튼을 눌러도 부작용이
  없다. 범위를 벗어난 복잡도를 추가하지 않는다

## 반응형

- 카드 폭: 768px 미만 약 85vw(한 장이 거의 꽉 차 보이되 다음 카드가 살짝 보여 스크롤 가능함을
  암시), 768px 이상 고정폭(예: 280px) — `ProductSlider`의 카드 폭 브레이크포인트 조정과 동일
  패턴, 정확한 px 값은 구현 시 `tokens.css` 스케일에 맞춰 결정
- 사진 영역은 정사각형(`aspect-ratio: 1 / 1`)으로 고정해 사진 유무에 따라 카드 높이가 들쭉날쭉
  해지지 않게 한다

## 접근성

- `ProductSlider`와 동일하게 네이티브 `overflow-x: auto` + `scroll-snap-type`로 키보드 스크롤
  (Tab, 화살표, PageUp/Down)을 기본 제공
- 좌우 버튼은 `aria-label="이전 리뷰"` / `aria-label="다음 리뷰"`로 방향 명시
- 별점은 위 "별점 표현 방식"대로 `aria-label`로 숫자 정보를 대체 제공, 시각 글리프는 `aria-hidden`
- 작성일은 `<time dateTime={createdAt}>` 요소로 감싸 기계가 읽을 수 있는 날짜 정보를 유지한다
- 리뷰 사진의 `alt`는 필수 입력(스키마에서 강제) — 장식용이 아니라 실제 리뷰 콘텐츠이므로 빈
  문자열 alt를 허용하지 않는다

## 예외 케이스

- `photo`가 없는 리뷰: 사진 영역 자체를 렌더링하지 않고 작성자명 → 별점 → 날짜 → 본문 순서로
  배치한다(사진 자리에 빈 placeholder를 넣지 않음 — `ProductCard`가 이미지 없는 상품을 스펙
  밖으로 둔 것과 달리, 리뷰는 포토리뷰가 선택사항이라는 설계이므로 photo 없는 카드가 정상
  케이스다)
- `content`가 매우 긴 경우: 카드 내부에서 일정 줄 수(예: 4줄) 이후 `line-clamp`로 잘라낸다 —
  "더보기" 같은 펼침 인터랙션은 상태를 요구하므로(CLAUDE.md "모듈 내부에서 fetch 금지"와는
  별개로, 이 모듈의 전제인 "상호작용 전혀 없음"을 깨지 않기 위해) 이번 스펙 범위에서는 제외하고
  단순 말줄임으로 처리한다. 추후 펼침 기능이 필요해지면 모듈 전체를 인터랙티브하게 다시 설계해야
  하므로 별도 feature로 분리할 것을 제안한다
- `rating`이 스키마 범위(1~5 정수) 밖이면 zod에서 막는다 — 컴포넌트 레벨 방어는 두지 않는다
- `reviews` 배열에 중복 `id`가 있는 경우는 스펙 밖으로 둔다(데이터 소스인 JSON 작성 시점의 책임)
