/**
 * @file EventEntryForm.tsx
 * @description 이벤트 응모 폼 — 스펙: docs/specs/event-entry-form.md.
 *   react-hook-form + zod로 클라이언트 검증, mock Route Handler(POST /api/event-entries)로
 *   제출한다.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button/Button";
import type { EventEntryFormProps } from "./schema";
import styles from "./EventEntryForm.module.css";

const entrySchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  phone: z
    .string()
    .min(1, "연락처를 입력해주세요")
    .regex(/^[0-9-]+$/, "숫자와 하이픈(-)만 입력해주세요"),
  agree: z.literal(true, { message: "개인정보 수집·이용에 동의해주세요" }),
});

type EntryValues = z.infer<typeof entrySchema>;
type SubmitState = "idle" | "submitting" | "submitted" | "duplicate" | "error";

export function EventEntryForm({ eventId, privacyNotice }: EventEntryFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EntryValues>({ resolver: zodResolver(entrySchema) });

  async function onSubmit(values: EntryValues) {
    setSubmitState("submitting");
    try {
      const response = await fetch("/api/event-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, name: values.name, phone: values.phone }),
      });
      const data = await response.json();
      setSubmitState(data.status === "submitted" ? "submitted" : "duplicate");
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "submitted") {
    return <p className={styles.success}>응모가 완료되었습니다. 감사합니다!</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {submitState === "duplicate" && <p className={styles.notice}>이미 응모하셨습니다.</p>}
      {submitState === "error" && (
        <p className={styles.notice}>제출에 실패했습니다. 다시 시도해주세요.</p>
      )}

      <div className={styles.field}>
        <label htmlFor="entry-name">이름</label>
        <input id="entry-name" aria-describedby="entry-name-error" {...register("name")} />
        {errors.name && (
          <p id="entry-name-error" className={styles.error}>
            {errors.name.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="entry-phone">연락처</label>
        <input
          id="entry-phone"
          placeholder="010-0000-0000"
          aria-describedby="entry-phone-error"
          {...register("phone")}
        />
        {errors.phone && (
          <p id="entry-phone-error" className={styles.error}>
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("agree")} />
          {privacyNotice}
        </label>
        {errors.agree && <p className={styles.error}>{errors.agree.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="md" disabled={submitState === "submitting"}>
        {submitState === "submitting" ? "제출 중..." : "응모하기"}
      </Button>
    </form>
  );
}
