import Link from "next/link";
import { apps } from "@/lib/apps";

/** 히어로의 가짜 맥 메뉴바 — 간식들이 실제로 올라가는 자리를 그대로 보여준다. */
export function MenuBar() {
  return (
    <div className="flex h-9 items-center justify-between rounded-xl border border-hairline bg-surface px-3.5 text-[13px] font-medium shadow-[0_1px_0_rgb(0_0_0/0.04)]">
      <div className="flex items-center gap-4 text-slate">
        <span className="font-bold text-ink">Snackbar</span>
        <span className="hidden sm:inline">파일</span>
        <span className="hidden sm:inline">편집</span>
        <span className="hidden sm:inline">보기</span>
      </div>
      <div className="flex items-center gap-1">
        {apps.map((app) => (
          <Link
            key={app.slug}
            href={`/${app.slug}`}
            title={app.name}
            aria-label={app.name}
            className="rounded-md px-1.5 py-0.5 text-base leading-none hover:bg-ink/10"
          >
            {app.emoji}
          </Link>
        ))}
        <span className="tabular ml-2 text-slate">오후 3:00</span>
      </div>
    </div>
  );
}
