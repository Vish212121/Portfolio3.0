import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './ambient-lyrics.css';

const SPOTIFY_POLL_MS = 8000;
const LYRIC_TICK_MS = 350;
const MAX_CUE_AGE_MS = 15000;

function parseSyncedLyrics(source) {
  if (typeof source !== 'string') return null;

  const cues = source.split(/\r?\n/).flatMap((line) => {
    const match = line.match(/^\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]\s*(.*)$/);
    if (!match) return [];

    const fraction = Number((match[3] || '').padEnd(3, '0'));
    const time = (Number(match[1]) * 60 + Number(match[2])) * 1000 + fraction;
    return [{ time, text: match[4].trim() }];
  });

  cues.sort((a, b) => a.time - b.time);
  return cues.some((cue) => cue.text) ? cues : null;
}

function lyricAt(cues, progressMs) {
  let index = -1;
  for (let i = 0; i < cues.length && cues[i].time <= progressMs; i++) index = i;
  return index;
}

export default function AmbientLyrics() {
  const [screen, setScreen] = useState(null);
  const [currentLine, setCurrentLine] = useState(null);

  useEffect(() => {
    setScreen(document.getElementById('screen'));

    const showLocalPreview = import.meta.env.DEV
      && new URLSearchParams(window.location.search).get('lyricsPreview') === '1';
    if (showLocalPreview) {
      const sampleLines = [
        'City lights dissolve into rain',
        'We find our way by the sound',
        'Every quiet road leads home',
        'Stay until the morning turns gold',
      ];
      let index = 0;
      const showNextLine = () => {
        setCurrentLine({ track: 'local-lyrics-preview', index, text: sampleLines[index] });
        index = (index + 1) % sampleLines.length;
      };
      showNextLine();
      const previewTimer = window.setInterval(showNextLine, 3800);
      return () => window.clearInterval(previewTimer);
    }

    let disposed = false;
    let polling = false;
    let activeTrack = null;
    let cues = null;
    let isPlaying = false;
    let progressMs = 0;
    let progressAt = 0;
    let durationMs = 0;
    let lyricsController = null;
    let lyricsRequest = 0;
    const lyricsCache = new Map();

    function hide() {
      isPlaying = false;
      setCurrentLine(null);
    }

    function syncLine() {
      if (!isPlaying || !cues?.length) {
        setCurrentLine(null);
        return;
      }

      const elapsedMs = performance.now() - progressAt;
      const position = Math.min(durationMs || Infinity, progressMs + elapsedMs);
      const index = lyricAt(cues, position);
      const text = index < 0 || position - cues[index].time > MAX_CUE_AGE_MS
        ? ''
        : cues[index].text;
      const next = text ? { track: activeTrack, index, text } : null;

      setCurrentLine((previous) => {
        if (previous?.track === next?.track && previous?.index === next?.index) return previous;
        return next;
      });
    }

    async function loadLyrics(track, key) {
      if (lyricsCache.has(key)) {
        cues = lyricsCache.get(key);
        syncLine();
        return;
      }

      lyricsController?.abort();
      const controller = new AbortController();
      lyricsController = controller;
      const request = ++lyricsRequest;

      const params = new URLSearchParams({
        artist: track.artist.split(',')[0].split('&')[0].trim(),
        track: track.track.split(' (')[0].split(' [')[0].trim(),
        album: track.album || '',
        duration_ms: String(track.duration_ms || ''),
      });

      try {
        const response = await fetch(`/api/lyrics?${params}`, { signal: controller.signal });
        if (!response.ok) {
          if (response.status === 404) lyricsCache.set(key, null);
          return;
        }

        const data = await response.json();
        const parsed = parseSyncedLyrics(data.synced);
        lyricsCache.set(key, parsed);
        if (!disposed && request === lyricsRequest && key === activeTrack) {
          cues = parsed;
          syncLine();
        }
      } catch {
        // A failed lookup leaves the existing background alone. The next poll retries.
      } finally {
        if (lyricsController === controller) lyricsController = null;
      }
    }

    async function pollSpotify() {
      if (disposed || polling || document.hidden) return;
      polling = true;

      try {
        const response = await fetch('/api/spotify');
        if (!response.ok) throw new Error('Spotify unavailable');
        const track = await response.json();
        if (disposed) return;

        if (!track.isPlaying || !track.track || !track.artist) {
          hide();
          return;
        }

        const key = `${track.artist}\u0000${track.track}\u0000${track.duration_ms || 0}`;
        const trackChanged = key !== activeTrack;
        if (trackChanged) {
          activeTrack = key;
          cues = null;
          setCurrentLine(null);
          lyricsController?.abort();
          lyricsController = null;
          lyricsRequest++;
        }

        isPlaying = true;
        progressMs = Number(track.progress_ms) || 0;
        durationMs = Number(track.duration_ms) || 0;
        progressAt = performance.now();

        if (trackChanged || (!cues && !lyricsController && !lyricsCache.has(key))) {
          loadLyrics(track, key);
        } else {
          syncLine();
        }
      } catch {
        if (!disposed) hide();
      } finally {
        polling = false;
      }
    }

    function onVisibilityChange() {
      if (document.hidden) hide();
      else pollSpotify();
    }

    const pollTimer = window.setInterval(pollSpotify, SPOTIFY_POLL_MS);
    const lyricTimer = window.setInterval(syncLine, LYRIC_TICK_MS);
    document.addEventListener('visibilitychange', onVisibilityChange);
    pollSpotify();

    return () => {
      disposed = true;
      window.clearInterval(pollTimer);
      window.clearInterval(lyricTimer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      lyricsController?.abort();
    };
  }, []);

  if (!screen || !currentLine) return null;

  return createPortal(
    <div className="ambient-lyrics" aria-hidden="true">
      <span className="ambient-lyrics__line" key={`${currentLine.track}:${currentLine.index}`}>
        {currentLine.text}
      </span>
    </div>,
    screen,
  );
}
