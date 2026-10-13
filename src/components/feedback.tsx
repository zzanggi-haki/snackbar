import { Giscus, giscusReady } from "./giscus";

/** giscus가 설정돼 있으면 댓글을, 아니면 대체 링크를 보여준다. */
export function Feedback({
  term,
  fallbackHref,
  fallbackLabel,
}: {
  term: string;
  fallbackHref: string;
  fallbackLabel: string;
}) {
  if (giscusReady) return <Giscus term={term} />;

  return (
    <div className="rounded-2xl border border-dashed border-hairline p-6 text-[15px] text-slate">
      <p>댓글 창구를 준비하고 있어요. 그동안은 GitHub로 알려주세요.</p>
      <a
        href={fallbackHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block font-semibold text-ink underline underline-offset-4"
      >
        {fallbackLabel}
      </a>
    </div>
  );
}
