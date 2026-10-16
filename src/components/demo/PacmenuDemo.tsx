"use client";

import type { CSSProperties } from "react";
import { Stage, type DemoInfo } from "./Stage";
import { Cursor, Desktop, MenuBar } from "./primitives";

// 메뉴바 좌표 (960×600). 노치는 가운데 415~545.
const NOTCH = { from: 415, to: 545 };
const PAC_X = 745;
const DIVIDER_X = 722;
const ICON_GAP = 30;
const ICONS = [
  { g: "☁", name: "iCloud Drive" },
  { g: "♫", name: "Spotify" },
  { g: "✎", name: "메모" },
  { g: "◐", name: "Amphetamine" },
  { g: "⌨", name: "입력 소스" },
  { g: "☂", name: "날씨" },
  { g: "✉", name: "Spark" },
  { g: "⚑", name: "Todoist" },
  { g: "◎", name: "CleanShot" },
  { g: "✦", name: "Raycast" },
];
const iconX = (i: number) => DIVIDER_X - ICON_GAP * (i + 1);
const underNotch = (i: number) => iconX(i) + 10 > NOTCH.from && iconX(i) - 10 < NOTCH.to;
const hiddenByNotch = ICONS.map((ic, i) => ({ ...ic, i })).filter((ic) => underNotch(ic.i));

const beats = [0, 900, 2200, 4000, 4800, 7000, 7400, 9800];

function frame(b: number) {
  return {
    eaten: b >= 2 && b <= 5,
    chomping: b === 2,
    tooltip: b === 1,
    belly: b === 4,
    bar: b >= 6,
    cursor: b === 0 ? { x: 600, y: 300 } : b <= 6 ? { x: PAC_X, y: 12 } : { x: 520, y: 380 },
    click: b === 2 || b === 4 || b === 6 ? b : 0,
  };
}

function Pacman({ chomping, open }: { chomping: boolean; open: boolean }) {
  return (
    <span className={`pm-pac ${chomping ? "is-chomping" : ""} ${open ? "is-open" : ""}`} style={{ left: PAC_X - 9 }}>
      <svg viewBox="0 0 18 18" width="18" height="18">
        <path className="pm-pac-open" d="M9 9 L17 4.5 A8 8 0 1 0 17 13.5 Z" fill="#fff" />
        <circle className="pm-pac-closed" cx="9" cy="9" r="8" fill="#fff" />
        <rect x="8" y="3.5" width="2" height="2" fill="#2a5d9f" />
      </svg>
    </span>
  );
}

export function PacmenuDemo({ app }: { app: DemoInfo }) {
  return (
    <Stage
      label={app.name}
      scenes={app.scenes}
      beats={beats}
      duration={11000}
      posterBeat={6}
      focus={(b) => (b === 4 ? { x: 480, w: 470 } : { x: 380, w: 580 })}
      sceneOf={(b) => (b <= 1 ? 0 : b <= 3 ? 1 : b <= 5 ? 2 : 3)}
      render={(b) => {
        const f = frame(b);
        return (
          <Desktop tone="sea">
            <MenuBar app="Finder" notch />
            {/* 메뉴바 위 상태 아이템들 — 노치보다 아래 층 */}
            <div className="pm-items">
              {ICONS.map((ic, i) => {
                const n = f.eaten ? i : ICONS.length - 1 - i;
                const style: CSSProperties = {
                  left: iconX(i) - 10,
                  transitionDelay: `${n * 70}ms`,
                  transform: f.eaten ? `translateX(${PAC_X - iconX(i)}px) scale(0.2)` : "none",
                  opacity: f.eaten ? 0 : 1,
                };
                return (
                  <span key={ic.name} className="pm-item" style={style}>
                    {ic.g}
                  </span>
                );
              })}
              <span className="pm-divider" style={{ left: DIVIDER_X - 5 }}>‹</span>
              <Pacman chomping={f.chomping} open={!f.eaten} />
            </div>
            {/* 노치는 아이콘을 덮는다 */}
            <div className="pm-notch" style={{ left: NOTCH.from, width: NOTCH.to - NOTCH.from }} />

            <div className={`pm-tooltip ${f.tooltip ? "is-open" : ""}`} style={{ left: PAC_X - 70 }}>
              🕳️ 노치에 {hiddenByNotch.length}개 가려짐
            </div>

            <div className={`pm-belly ${f.belly ? "is-open" : ""}`} style={{ left: PAC_X - 200 }}>
              <div className="pm-belly-title">🟡 팩미의 뱃속</div>
              {ICONS.slice(0, 6).map((ic) => (
                <div key={ic.name} className="pm-belly-row">
                  <span>{ic.g}</span>
                  {ic.name}
                </div>
              ))}
              <div className="pm-belly-more">…외 {ICONS.length - 6}개</div>
              <div className="pm-belly-sep" />
              <div className="pm-belly-row">🍽️ 팩미 바 열기</div>
              <div className="pm-belly-row">⚙️ 설정…</div>
            </div>

            <div className={`pm-bar ${f.bar ? "is-open" : ""}`} style={{ left: NOTCH.from - 40 }}>
              <span className="pm-bar-label">노치 뒤에 있던 아이콘</span>
              {hiddenByNotch.map((ic) => (
                <span key={ic.name} className="pm-bar-item" title={ic.name}>
                  {ic.g}
                </span>
              ))}
            </div>

            <Cursor {...f.cursor} click={f.click} />
          </Desktop>
        );
      }}
    />
  );
}
