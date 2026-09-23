/**
 * @file Button.tsx
 * @description 공통 버튼 컴포넌트 — variant/size 프리셋을 제공하고, href가 있으면 <a>,
 *   없으면 <button>으로 렌더링한다. 모든 모듈의 CTA는 이 컴포넌트를 재사용한다.
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = AsButton | AsLink;

/** variant/size/disabled 상태를 조합해 CSS Modules 클래스 문자열을 만든다 */
function classNames(variant: Variant, size: Size, disabled: boolean | undefined) {
  return [styles.button, styles[variant], styles[size], disabled ? styles.disabled : ""]
    .filter(Boolean)
    .join(" ");
}

/** href 유무로 링크형/버튼형을 자동 판단해 렌더링한다 */
export function Button({ variant = "primary", size = "md", children, ...rest }: ButtonProps) {
  if (rest.href) {
    const { href, ...anchorRest } = rest as AsLink;
    return (
      <a href={href} className={classNames(variant, size, undefined)} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { disabled, ...buttonRest } = rest as AsButton;
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(variant, size, disabled)}
      {...buttonRest}
    >
      {children}
    </button>
  );
}
