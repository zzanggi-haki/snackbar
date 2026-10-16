"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

// ?demoBeat=N — 해당 비트에서 정지 (썸네일·SNS용 캡처, 레이아웃 점검용)
const noop = () => () => {};
const readSeek = () => {
  const v = new URLSearchParams(window.location.search).get("demoBeat");
  return v === null ? null : Number(v);
};

export const STAGE_W = 960;
export const STAGE_H = 600;

export type Timeline = {
  /** 각 비트가 시작되는 시각(ms). 0부터 오름차순. */
  beats: number[];
  /** 한 바퀴 길이(ms). 마지막 비트 이후 여기서 처음으로 돌아간다. */
  duration: number;
  /** 비트 → 자막(scene) 인덱스 */
  sceneOf: (beat: number) => number;
  /** 모션 줄이기 사용자에게 보여줄 정지 화면 비트 */
  posterBeat: number;
  /** 좁은 화면에서 카메라가 비출 영역(960×600 좌표). 없으면 전체를 축소해서 보여준다. */
  focus?: (beat: number) => Focus;
};

export type Focus = { x: number; w: number; y?: number };

/** 이 폭보다 좁으면 전체 축소 대신 focus 영역을 따라가는 카메라로 보여준다 */
const COMPACT_W = 640;
const COMPACT_RATIO = 4 / 3;

/** 데모가 앱 데이터에서 필요로 하는 것 */
export type DemoInfo = { name: string; scenes: string[] };

type Props = Timeline & {
  scenes: string[];
  label: string;
  render: (beat: number) => ReactNode;
};

/**
 * 960×600 좌표계로 그린 데모를 컨테이너 폭에 맞춰 축소하고, 비트 타임라인을 반복 재생한다.
 * 화면 밖이면 멈추고, prefers-reduced-motion이면 posterBeat에서 정지한 채 시작한다.
 */
export function Stage({ beats, duration, sceneOf, posterBeat, focus, scenes, label, render }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(STAGE_W);
  const [rawBeat, setBeat] = useState(0);
  // null = 사용자가 아직 안 건드림 → 모션 줄이기 설정을 따른다
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const seek = useSyncExternalStore(noop, readSeek, () => null);
  const playing = seek === null && (userPlaying ?? !reduced);
  const beat = seek ?? (userPlaying === null && reduced ? posterBeat : rawBeat);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const next = beat + 1;
    const wait = next < beats.length ? beats[next] - beats[beat] : duration - beats[beat];
    const id = window.setTimeout(() => setBeat(next < beats.length ? next : 0), wait);
    return () => window.clearTimeout(id);
  }, [beat, playing, visible, beats, duration]);

  const compact = !!focus && width < COMPACT_W;
  let transform = `scale(${width / STAGE_W})`;
  if (compact) {
    const f = focus(beat);
    const scale = width / f.w;
    const viewH = width / COMPACT_RATIO / scale;
    const y = Math.min(Math.max(f.y ?? 0, 0), STAGE_H - viewH);
    const x = Math.min(Math.max(f.x, 0), STAGE_W - f.w);
    transform = `translate(${-x * scale}px, ${-y * scale}px) scale(${scale})`;
  }

  const scene = sceneOf(beat);
  const jumpToScene = (s: number) => {
    const first = beats.findIndex((_, i) => sceneOf(i) === s);
    if (first < 0) return;
    setBeat(first);
    if (userPlaying === null && reduced) setUserPlaying(false);
  };

  return (
    <figure className="demo" data-seek={seek !== null || undefined}>
      <div
        ref={wrapRef}
        className={`demo-screen ${compact ? "is-compact" : ""}`}
        style={{ aspectRatio: compact ? `${COMPACT_RATIO}` : `${STAGE_W} / ${STAGE_H}` }}
        role="img"
        aria-label={`${label} 사용 데모: ${scenes.join(" → ")}`}
      >
        <div
          className="demo-canvas"
          style={{ width: STAGE_W, height: STAGE_H, transform }}
          aria-hidden
        >
          {render(beat)}
        </div>
      </div>

      <figcaption className="demo-caption">
        <button
          type="button"
          className="demo-play"
          onClick={() => {
            if (userPlaying === null && reduced) setBeat(posterBeat);
            setUserPlaying(!playing);
          }}
          aria-label={playing ? "일시정지" : "재생"}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <ol className="demo-scenes">
          {scenes.map((text, i) => (
            <li key={i}>
              <button
                type="button"
                className={i === scene ? "is-active" : ""}
                onClick={() => jumpToScene(i)}
                aria-current={i === scene ? "step" : undefined}
              >
                <span className="demo-scene-no">{i + 1}</span>
                <span className="demo-scene-text">{text}</span>
              </button>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
