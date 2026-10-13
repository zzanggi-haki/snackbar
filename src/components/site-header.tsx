import Link from "next/link";
import { OWNER } from "@/lib/apps";

export function SiteHeader() {
  return (
    <header>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span aria-hidden>🍿</span>
          Snackbar
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-slate">
          <Link href="/#shelf" className="hover:text-ink">
            간식들
          </Link>
          <Link href="/about" className="hover:text-ink">
            About
          </Link>
          <a
            href={`https://github.com/${OWNER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            GitHub
          </a>
        </nav>
      </div>
      <div className="awning" aria-hidden />
    </header>
  );
}
