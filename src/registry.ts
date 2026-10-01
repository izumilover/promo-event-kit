/**
 * @file registry.ts
 * @description 모듈 레지스트리 — JSON section의 `type` 문자열을 실제 컴포넌트 + props 검증
 *   스키마에 연결한다. 새 모듈을 추가할 때 이 파일에 한 줄 등록하는 것으로 SectionRenderer가
 *   그 모듈을 바로 렌더링할 수 있게 된다(CLAUDE.md "모듈 추가 절차" 6단계).
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-10-01
 */
import type { ComponentType } from "react";
import type { ZodType } from "zod";
import { HeroBanner } from "@/modules/hero-banner/HeroBanner";
import { HeroBannerSchema } from "@/modules/hero-banner/schema";
import { BannerCarousel } from "@/modules/banner-carousel/BannerCarousel";
import { BannerCarouselSchema } from "@/modules/banner-carousel/schema";
import { BenefitCards } from "@/modules/benefit-cards/BenefitCards";
import { BenefitCardsSchema } from "@/modules/benefit-cards/schema";
import { ProductGrid } from "@/modules/product-grid/ProductGrid";
import { ProductGridSchema } from "@/modules/product-grid/schema";
import { ProductSlider } from "@/modules/product-slider/ProductSlider";
import { ProductSliderSchema } from "@/modules/product-slider/schema";
import { AnchorTabs } from "@/modules/anchor-tabs/AnchorTabs";
import { AnchorTabsSchema } from "@/modules/anchor-tabs/schema";
import { NoticeAccordion } from "@/modules/notice-accordion/NoticeAccordion";
import { NoticeAccordionSchema } from "@/modules/notice-accordion/schema";
import { CountdownTimer } from "@/modules/countdown-timer/CountdownTimer";
import { CountdownTimerSchema } from "@/modules/countdown-timer/schema";
import { ShareBar } from "@/modules/share-bar/ShareBar";
import { ShareBarSchema } from "@/modules/share-bar/schema";
import { CouponDownload } from "@/modules/coupon-download/CouponDownload";
import { CouponDownloadSchema } from "@/modules/coupon-download/schema";
import { EventEntryForm } from "@/modules/event-entry-form/EventEntryForm";
import { EventEntryFormSchema } from "@/modules/event-entry-form/schema";
import { VideoBlock } from "@/modules/video-block/VideoBlock";
import { VideoBlockSchema } from "@/modules/video-block/schema";
import { RichText } from "@/modules/rich-text/RichText";
import { RichTextSchema } from "@/modules/rich-text/schema";
import { ImageMap } from "@/modules/image-map/ImageMap";
import { ImageMapSchema } from "@/modules/image-map/schema";
import { ReviewCarousel } from "@/modules/review-carousel/ReviewCarousel";
import { ReviewCarouselSchema } from "@/modules/review-carousel/schema";

export type ModuleRegistryEntry<TProps = unknown> = {
  component: ComponentType<TProps>;
  schema: ZodType<TProps>;
};

/**
 * type → { component, schema } 매핑. 새 모듈을 만들면 여기 한 줄 추가하는 것으로
 * SectionRenderer가 그 모듈을 바로 렌더링할 수 있게 된다(CLAUDE.md "모듈 추가 절차" 6단계).
 *
 * 모듈마다 props 타입이 다르므로(HeroBannerProps, ProductGridProps, ...) 한 레코드 안에
 * 여러 구체 타입을 담아야 한다 — TypeScript로는 표현할 방법이 없어 여기서만 any를 허용한다.
 * 실제 타입 안전성은 등록 시점(각 모듈의 schema.ts)과 SectionRenderer의 zod 런타임 검증이 보장한다.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- 위 주석 참고, 이 파일에서만 허용
export const moduleRegistry: Record<string, ModuleRegistryEntry<any>> = {
  heroBanner: { component: HeroBanner, schema: HeroBannerSchema },
  bannerCarousel: { component: BannerCarousel, schema: BannerCarouselSchema },
  benefitCards: { component: BenefitCards, schema: BenefitCardsSchema },
  productGrid: { component: ProductGrid, schema: ProductGridSchema },
  productSlider: { component: ProductSlider, schema: ProductSliderSchema },
  anchorTabs: { component: AnchorTabs, schema: AnchorTabsSchema },
  noticeAccordion: { component: NoticeAccordion, schema: NoticeAccordionSchema },
  countdownTimer: { component: CountdownTimer, schema: CountdownTimerSchema },
  shareBar: { component: ShareBar, schema: ShareBarSchema },
  couponDownload: { component: CouponDownload, schema: CouponDownloadSchema },
  eventEntryForm: { component: EventEntryForm, schema: EventEntryFormSchema },
  videoBlock: { component: VideoBlock, schema: VideoBlockSchema },
  richText: { component: RichText, schema: RichTextSchema },
  imageMap: { component: ImageMap, schema: ImageMapSchema },
  reviewCarousel: { component: ReviewCarousel, schema: ReviewCarouselSchema },
};
