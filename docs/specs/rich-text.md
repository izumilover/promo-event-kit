# RichText 스펙

> 작성: kamiz · 2026-09-28 · P2(여유분)

## 개요

긴 안내문/약관처럼 서식이 필요한 자유 콘텐츠 영역.

## 설계 결정 — 원시 HTML 대신 구조화된 블록 배열을 받는다

`docs/plan.md`의 원안은 "HTML 문구"였지만, JSON에 원시 HTML을 담아 `dangerouslySetInnerHTML`로
렌더링하는 방식은 채택하지 않는다. 이 프로젝트 CLAUDE.md의 전역 보안 원칙("dangerouslySetInnerHTML은
신뢰된 값에만, 사용 시 sanitizer 필수")을 지키려면 sanitizer 라이브러리(DOMPurify 등)를 새로
추가해야 하는데, "새 라이브러리를 임의로 추가하지 않는다" 원칙과 충돌한다. 대신 문단/제목/목록
정도의 제한된 블록 타입을 JSON으로 기술하고 안전한 JSX로 변환해서 렌더링한다 — XSS 위험이 아예
없고 새 의존성도 필요 없다. 더 풍부한 서식이 실제로 필요해지면 그때 사용자와 상의해서
sanitizer 도입 여부를 결정한다.

## Props

```typescript
type RichTextBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "list"; items: string[] };

type RichTextProps = {
  blocks: RichTextBlock[];
};
```

## 상태

- `blocks`가 빈 배열이면 렌더링하지 않는다

## 접근성

- `heading`의 `level`(기본 3)로 실제 `<h2>`/`<h3>`를 렌더링 — 텍스트만 크게 보이는 가짜
  제목(`<p>` + font-size)을 만들지 않는다(스크린리더 헤딩 내비게이션 지원)
- `list`는 실제 `<ul>`/`<li>`로 렌더링

## 예외 케이스

- 알 수 없는 `type` 값을 가진 블록 하나는 그 블록만 건너뛴다(SectionRenderer의 "섹션 단위
  건너뛰기"와 같은 원칙을 블록 단위로도 적용 — 문서 전체가 안 깨지게)
