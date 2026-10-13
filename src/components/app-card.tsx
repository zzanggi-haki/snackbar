import Image from "next/image";
import Link from "next/link";
import { dmgUrl, type SnackApp } from "@/lib/apps";

export function AppCard({ app, version }: { app: SnackApp; version?: string }) {
  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface transition-transform hover:-translate-y-0.5">
      <div
        className="flex items-center justify-between px-5 py-5 text-on-wrap"
        style={{ background: app.wrap }}
      >
        <Image
          src={app.icon}
          alt=""
          width={64}
          height={64}
          className="size-16 drop-shadow-sm"
        />
        {version && (
          <span className="tabular rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold">
            {version}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold tracking-tight">
          {/* 카드 전체가 상세 페이지 링크. 다운로드 버튼만 그 위로 올라온다. */}
          <Link href={`/${app.slug}`} className="after:absolute after:inset-0">
            {app.name} <span aria-hidden>{app.emoji}</span>
          </Link>
        </h3>
        <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-slate">
          {app.tagline}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <a
            href={dmgUrl(app)}
            className="relative z-10 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-ketchup hover:text-white"
          >
            다운로드
          </a>
          <span className="text-xs text-stone">{app.requires}</span>
        </div>
      </div>
    </article>
  );
}
