import type { CSSProperties, ReactNode } from "react";

export const MENUBAR_H = 28;

/** 바탕화면 — 앱마다 톤만 바꾼다 */
export function Desktop({ tone = "sea", children }: { tone?: "sea" | "dusk" | "mint" | "plum"; children: ReactNode }) {
  return <div className={`mk-desktop mk-desktop--${tone}`}>{children}</div>;
}

/** 상단 메뉴바. right에는 상태 아이템들(오른쪽 → 왼쪽 순으로 보이는 그대로)을 넣는다. */
export function MenuBar({ app = "Finder", right, notch = false }: { app?: string; right?: ReactNode; notch?: boolean }) {
  return (
    <div className="mk-menubar" style={{ height: MENUBAR_H }}>
      <div className="mk-menubar-left">
        <span className="mk-apple"></span>
        <b>{app}</b>
        <span>파일</span>
        <span>편집</span>
        <span>보기</span>
        <span>윈도우</span>
      </div>
      {notch && <div className="mk-notch" />}
      <div className="mk-menubar-right">
        {right}
        <span className="mk-sf">⌕</span>
        <span className="mk-clock">10월 16일 (목) 오후 2:41</span>
      </div>
    </div>
  );
}

/** 메뉴바 상태 아이템 하나 */
export function StatusItem({
  children,
  active,
  style,
  className = "",
}: {
  children: ReactNode;
  active?: boolean;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <span className={`mk-status ${active ? "is-active" : ""} ${className}`} style={style}>
      {children}
    </span>
  );
}

/** 마우스 커서. x/y는 960×600 좌표, click이 바뀔 때마다 파동이 한 번 퍼진다. */
export function Cursor({ x, y, click, halo, hidden }: { x: number; y: number; click?: number; halo?: boolean; hidden?: boolean }) {
  return (
    <div className="mk-cursor" style={{ transform: `translate(${x}px, ${y}px)`, opacity: hidden ? 0 : 1 }}>
      {halo && <span className="mk-cursor-halo" />}
      {click ? <span key={click} className="mk-cursor-click" /> : null}
      <svg width="22" height="28" viewBox="0 0 22 28">
        <path
          d="M2 1.5 L2 22 L7.2 17.2 L10.8 25.5 L14.2 24 L10.7 15.9 L17.8 15.9 Z"
          fill="#111"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** 메뉴바 아래로 떨어지는 팝오버. x는 화살표가 가리킬 지점. */
export function Popover({
  x,
  width,
  open,
  children,
}: {
  x: number;
  width: number;
  open: boolean;
  children: ReactNode;
}) {
  const left = Math.min(Math.max(x - width / 2, 8), 960 - width - 8);
  return (
    <div
      className={`mk-popover ${open ? "is-open" : ""}`}
      style={{ left, top: MENUBAR_H + 8, width, ["--arrow-x" as string]: `${x - left}px` }}
    >
      {children}
    </div>
  );
}

/** 화면 하단 키 입력 HUD */
export function KeyHud({ keys, show }: { keys: string[]; show: boolean }) {
  return (
    <div className={`mk-keyhud ${show ? "is-open" : ""}`}>
      {keys.map((k) => (
        <kbd key={k}>{k}</kbd>
      ))}
    </div>
  );
}

/** 앱 아이콘 자리표시 — 둥근 사각형에 이모지/글자 */
export function AppGlyph({ bg, children, size = 30 }: { bg: string; children: ReactNode; size?: number }) {
  return (
    <span className="mk-glyph" style={{ background: bg, width: size, height: size, fontSize: size * 0.52 }}>
      {children}
    </span>
  );
}
