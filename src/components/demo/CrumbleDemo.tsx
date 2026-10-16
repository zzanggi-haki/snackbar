"use client";

import { Stage, type DemoInfo } from "./Stage";
import { AppGlyph, Cursor, Desktop, MenuBar, Popover, StatusItem } from "./primitives";

const TICK = 200;
const DURATION = 13000;
const beats = Array.from({ length: DURATION / TICK }, (_, i) => i * TICK);

// 타임랩스: 실제 1초 = 13.5분
const RATE = 13.5 / 1000;
const T = { open: 800, figma: 1000, finalcut: 4000, idle: 6500, back: 8300 };
const GOAL_MIN = 120;

const APPS = [
  { id: "figma", name: "Figma", start: 72, glyph: <AppGlyph bg="#1e1e1e" size={26}>✦</AppGlyph> },
  { id: "finalcut", name: "Final Cut Pro", start: 65, glyph: <AppGlyph bg="linear-gradient(135deg,#ff5f6d,#ffc371,#5ee7df)" size={26}>🎬</AppGlyph> },
  { id: "claude", name: "Claude", start: 48, glyph: <AppGlyph bg="#d97757" size={26}>✳</AppGlyph> },
  { id: "chrome", name: "Chrome", start: 34, glyph: <AppGlyph bg="conic-gradient(#ea4335 0 120deg,#fbbc05 0 240deg,#34a853 0)" size={26}>●</AppGlyph> },
] as const;
type AppId = (typeof APPS)[number]["id"];

const overlap = (t: number, a: number, b: number) => Math.max(0, Math.min(t, b) - a);

function frame(b: number) {
  const t = b * TICK;
  const mins: Record<AppId, number> = {
    figma: 72 + overlap(t, T.figma, T.finalcut) * RATE,
    finalcut: 65 + (overlap(t, T.finalcut, T.idle) + overlap(t, T.back, DURATION)) * RATE,
    claude: 48,
    chrome: 34,
  };
  const front: AppId | "idle" = t < T.finalcut ? "figma" : t < T.idle ? "finalcut" : t < T.back ? "idle" : "finalcut";
  const goalPct = Math.min(1, mins.finalcut / GOAL_MIN);
  const achieved = goalPct >= 1;
  return { t, mins, front, goalPct, achieved };
}

const hm = (m: number) => {
  const h = Math.floor(m / 60);
  const mm = Math.floor(m % 60);
  return h ? `${h}시간 ${String(mm).padStart(2, "0")}분` : `${mm}분`;
};

export function CrumbleDemo({ app }: { app: DemoInfo }) {
  return (
    <Stage
      label={app.name}
      scenes={app.scenes}
      beats={beats}
      duration={DURATION}
      posterBeat={Math.round(11000 / TICK)}
      focus={(b) => {
        const t = b * TICK;
        return t >= T.idle && t < T.back ? { x: 20, w: 560, y: 50 } : { x: 500, w: 460 };
      }}
      sceneOf={(b) => {
        const t = b * TICK;
        return t < T.finalcut ? 0 : t < T.idle ? 1 : t < T.back ? 2 : 3;
      }}
      render={(b) => {
        const f = frame(b);
        const open = f.t >= T.open;
        const total = Object.values(f.mins).reduce((a, m) => a + m, 0);
        const max = Math.max(...Object.values(f.mins));
        const sorted = [...APPS].sort((a, z) => f.mins[z.id] - f.mins[a.id]);
        return (
          <Desktop tone="dusk">
            <MenuBar
              app={f.front === "idle" ? "Finder" : APPS.find((a) => a.id === f.front)!.name}
              right={
                <>
                  <StatusItem active={open}>🍪</StatusItem>
                  <StatusItem>⌁</StatusItem>
                </>
              }
            />

            {/* 최전면 앱 창 */}
            <div className={`cr-window ${f.front === "idle" ? "is-idle" : ""}`}>
              <div className="cr-window-bar">
                <i /><i /><i />
                <span>{f.front === "figma" ? "로고 시안 v3 — Figma" : "브이로그 12화 — Final Cut Pro"}</span>
              </div>
              {f.front === "figma" ? (
                <div className="cr-figma">
                  <div className="cr-shape cr-shape--a" />
                  <div className="cr-shape cr-shape--b" />
                  <div className="cr-shape cr-shape--c" />
                </div>
              ) : (
                <div className="cr-fcp">
                  <div className="cr-viewer" />
                  <div className="cr-timeline">
                    <span style={{ width: "34%", background: "#5b8def" }} />
                    <span style={{ width: "22%", background: "#7c5bef" }} />
                    <span style={{ width: "28%", background: "#5b8def" }} />
                    <i style={{ left: `${10 + ((f.t / 60) % 80)}%` }} />
                  </div>
                </div>
              )}
            </div>
            {f.front === "idle" && <div className="cr-idle">💤 자리 비움 — 측정 일시정지</div>}
            <div className="cr-timelapse">⏩ 타임랩스</div>

            <Popover x={720} width={330} open={open}>
              <div className="cr-pop">
                <div className="cr-head">
                  <span>🍪</span>
                  <b>Crumble</b>
                  <span className="cr-head-actions">▥ ▦ ⚙︎ ⏻</span>
                </div>
                <div className="cr-total-label">
                  오늘 총 작업 시간 {f.front === "idle" && <em>⏸ 일시정지</em>}
                </div>
                <div className="cr-total">{hm(total)}</div>

                <div className={`cr-goal ${f.achieved ? "is-done" : ""}`}>
                  <div className="cr-goal-top">
                    <span>🎯 Final Cut Pro</span>
                    {f.achieved ? <b>🏆 달성</b> : <span>{Math.floor(f.goalPct * 100)}%</span>}
                  </div>
                  <div className="cr-goal-bar">
                    <span style={{ width: `${f.goalPct * 100}%` }} />
                  </div>
                  <div className="cr-goal-sub">
                    {hm(Math.min(f.mins.finalcut, GOAL_MIN))} / 2시간
                  </div>
                </div>

                <div className="cr-list">
                  {sorted.map((a) => (
                    <div key={a.id} className={`cr-row ${f.front === a.id ? "is-front" : ""}`}>
                      {a.glyph}
                      <div className="cr-row-body">
                        <div className="cr-row-top">
                          <span>{a.name}</span>
                          <span>{hm(f.mins[a.id])}</span>
                        </div>
                        <div className="cr-row-bar">
                          <span style={{ width: `${(f.mins[a.id] / max) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cr-foot">
                  <span>오늘 4개 앱</span>
                  <span>v0.1.0</span>
                </div>
              </div>
            </Popover>

            {f.achieved && (
              <div className="cr-confetti" key="confetti">
                {Array.from({ length: 28 }, (_, i) => (
                  <i key={i} style={{ ["--i" as string]: i, left: `${560 + ((i * 37) % 320)}px` }} />
                ))}
              </div>
            )}

            <Cursor
              x={f.t < 300 ? 420 : f.t < T.figma + 600 ? 716 : 300}
              y={f.t < 300 ? 360 : f.t < T.figma + 600 ? 10 : 330}
              click={f.t >= T.open && f.t < T.open + TICK ? 1 : 0}
              hidden={f.front === "idle"}
            />
          </Desktop>
        );
      }}
    />
  );
}
