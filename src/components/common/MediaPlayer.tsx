"use client";

import * as React from "react";

import {
  Expand,
  GitCompareArrows,
  LucideVolume2,
  Pause,
  Play,
  VideoIcon,
  VolumeOff,
} from "lucide-react";
import { cn } from "@/lib/utils/classnames";

interface AdvancedMediaPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function AdvancedMediaPlayer({
  src,
  poster,
  className,
}: AdvancedMediaPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(0.8);
  const [muted, setMuted] = React.useState(false);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [fullscreen, setFullscreen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${sec}`;
  };

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setPlaying(true);
    } else {
      vid.pause();
      setPlaying(false);
    }
  };

  const handleProgress = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setProgress((vid.currentTime / vid.duration) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vid = videoRef.current;
    if (!vid) return;
    const pct = Number(e.target.value);
    vid.currentTime = (pct / 100) * vid.duration;
    setProgress(pct);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value) / 100;
    setVolume(v);
    if (videoRef.current) videoRef.current.volume = v;
    setMuted(v === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullscreen(false);
    } else {
      el.requestFullscreen();
      setFullscreen(true);
    }
  };

  const changeSpeed = () => {
    const next = playbackRate >= 2 ? 0.5 : playbackRate + 0.5;
    setPlaybackRate(next);
    if (videoRef.current) videoRef.current.playbackRate = next;
  };

  return (
    <div
      ref={containerRef}
      dir="ltr"
      className={cn(
        "relative w-full group aspect-[4/3] max-w-4xl mx-auto rounded-lg bg-black shadow-lg overflow-hidden",
        className,
      )}
    >
      {/* ویدیو */}
      <div className="relative aspect-video h-full w-full">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="absolute inset-0 h-full w-full object-contain "
          onClick={togglePlay}
          onTimeUpdate={handleProgress}
          onLoadedMetadata={(e) =>
            setDuration((e.target as HTMLVideoElement).duration)
          }
          onWaiting={() => setLoading(true)} // 🔄 بافر یا لود
          onCanPlay={() => setLoading(false)} // آماده پخش
          onPlaying={() => setLoading(false)} // شروع پخش
        />
        {!playing && !loading && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center text-white/90 hover:scale-110 transition-transform"
            aria-label="play"
          >
            <Play size={60} />
          </button>
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white animate-spin rounded-full" />
          </div>
        )}
      </div>

      {/* کنترل‌ها */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/30 p-4 space-y-3 text-white ${
          playing
            ? "opacity-0 group-hover:opacity-100 transition-opacity"
            : "opacity-70"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* نوار پیشرفت + زمان */}
        <div className="flex items-center gap-3">
          <span className="text-xs w-14 text-center">
            {formatTime((progress / 100) * duration)}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="flex-1 custom-slider"
          />
          <span className="text-xs w-14 text-center">
            {formatTime(duration)}
          </span>
        </div>

        {/* دکمه‌ها */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} aria-label="play/pause">
              {playing ? <Pause size={22} /> : <Play size={22} />}
            </button>

            <button onClick={toggleMute} aria-label="mute/unmute">
              {muted || volume === 0 ? (
                <VolumeOff size={22} />
              ) : (
                <LucideVolume2 size={22} />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={muted ? 0 : volume * 100}
              onChange={handleVolume}
              className="custom-slider !w-16"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={changeSpeed}
              className="flex items-center gap-1 text-sm"
              aria-label="change speed"
            >
              <VideoIcon size={20} /> {playbackRate}x
            </button>
            <button onClick={toggleFullscreen} aria-label="fullscreen">
              {fullscreen ? (
                <GitCompareArrows size={20} />
              ) : (
                <Expand size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
