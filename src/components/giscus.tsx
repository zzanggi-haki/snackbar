"use client";

import { useEffect, useRef } from "react";

const config = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
};

export const giscusReady = Boolean(
  config.repo && config.repoId && config.category && config.categoryId,
);

/** term: 이 페이지의 스레드를 구분하는 키 (앱 슬러그, "roadmap" 등) */
export function Giscus({ term }: { term: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !giscusReady) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    const attrs: Record<string, string> = {
      "data-repo": config.repo!,
      "data-repo-id": config.repoId!,
      "data-category": config.category!,
      "data-category-id": config.categoryId!,
      "data-mapping": "specific",
      "data-term": term,
      "data-strict": "1",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": "preferred_color_scheme",
      "data-lang": "ko",
      "data-loading": "lazy",
    };
    for (const [k, v] of Object.entries(attrs)) script.setAttribute(k, v);
    el.appendChild(script);

    return () => {
      el.replaceChildren();
    };
  }, [term]);

  return <div ref={ref} />;
}
