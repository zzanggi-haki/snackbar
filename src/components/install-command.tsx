"use client";

import { useState } from "react";

export function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // 클립보드 권한이 막힌 환경: 사용자가 직접 선택해 복사할 수 있게 둔다.
    }
  }

  return (
    <div className="flex items-stretch overflow-hidden rounded-xl bg-code text-on-code">
      <code className="flex-1 overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-relaxed whitespace-nowrap [scrollbar-width:none]">
        <span className="select-none opacity-50">$ </span>
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 border-l border-white/10 px-4 text-sm font-semibold hover:bg-white/10"
      >
        <span aria-live="polite">{copied ? "복사됨" : "복사"}</span>
      </button>
    </div>
  );
}
