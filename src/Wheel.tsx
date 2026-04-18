import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft, Trophy } from 'lucide-react';

import { capitalize } from './utils';
import { RiskEntry } from './types';

interface Props {
  participants: RiskEntry[];
}

const colors = [
  '#0f3d91',
  '#1e5bb8',
  '#0c6b8f',
  '#a36b00',
  '#c48b18',
  '#6b4f00',
  '#144e75',
  '#123c63',
  '#7a5410',
  '#b7791f',
];

export const Wheel: React.FC<Props> = ({ participants }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [spinDirection, setSpinDirection] = useState<
    'clockwise' | 'counterclockwise'
  >('clockwise');
  const [showPopup, setShowPopup] = useState(false);
  const [popupWinner, setPopupWinner] = useState<RiskEntry | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const numSectors = participants.length;

  useEffect(() => {
    if (canvasRef.current) {
      drawWheel();
    }
  }, [participants, rotation]);

  const darkenColor = (color: string, amount: number): string => {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);

    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  const drawWheel = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const radius = canvas.width / 2;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (numSectors === 0) {
      ctx.fillStyle = '#081224';
      ctx.beginPath();
      ctx.arc(radius, radius, radius - 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.font = '700 20px Space Grotesk, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Add risks to spin the wheel', radius, radius - 6);
      ctx.font = '400 14px DM Sans, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fillText('Your DECA PMCD entries will appear here.', radius, radius + 22);
      return;
    }

    const sliceAngle = (2 * Math.PI) / numSectors;
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(-rotation * (Math.PI / 180));

    // Draw sectors
    for (let i = 0; i < numSectors; i++) {
      const startAngle = i * sliceAngle;
      const endAngle = (i + 1) * sliceAngle;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      const color = darkenColor(colors[i % colors.length], 30);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255, 230, 180, 0.22)';
      ctx.stroke();

      // Draw the risk title in the sector.
      ctx.save();
      ctx.rotate((startAngle + endAngle) / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.font = '700 15px Space Grotesk, sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.shadowBlur = 3;
      wrapText(ctx, participants[i]?.title || '', radius * 0.56, 0, 90, 18);
      ctx.restore();
    }

    ctx.restore();

    ctx.save();
    ctx.translate(radius, radius);
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = '#081224';
    ctx.fill();
    ctx.lineWidth = 7;
    ctx.strokeStyle = '#fbbf24';
    ctx.stroke();
    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'center';
    ctx.font = '700 14px Space Grotesk, sans-serif';
    ctx.fillText('DECA', 0, -4);
    ctx.font = '600 10px Space Grotesk, sans-serif';
    ctx.fillStyle = 'rgba(248,250,252,0.8)';
    ctx.fillText('PMCD', 0, 12);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 2, 0, Math.PI * 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.7)';
    ctx.stroke();
    ctx.restore();

    // Draw the static indicator
    const indicatorLength = 30;
    const indicatorWidth = 24;
    ctx.save();
    ctx.translate(canvas.width - 2, canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(-indicatorLength, 0);
    ctx.lineTo(0, -indicatorWidth / 2);
    ctx.lineTo(0, indicatorWidth / 2);
    ctx.closePath();
    ctx.fillStyle = '#fbbf24';
    ctx.fill();
    ctx.strokeStyle = '#fff7ed';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  };

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
  ) => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    const startY = y - ((lines.length - 1) * lineHeight) / 2;

    lines.slice(0, 3).forEach((line, index) => {
      ctx.fillText(line, x, startY + index * lineHeight);
    });
  };

  const startSpin = () => {
    if (spinning) return;
    setSpinning(true);

    // Set the number of full rotations and calculate final rotation
    const numFullRotations = Math.random() * 5 + 5; // Between 5 and 10 full rotations
    const totalRotation = numFullRotations * 360;
    const finalRotation =
      (rotation +
        (spinDirection === 'clockwise' ? -totalRotation : totalRotation)) %
      360;

    const spinDuration = 6000;
    const easing = (t: number) => {
      // Ease-out cubic
      return 1 - Math.pow(1 - t, 3);
    };

    let startTime: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const t = Math.min(elapsed / spinDuration, 1);
      const easeT = easing(t);
      const currentRotation =
        rotation +
        (spinDirection === 'clockwise' ? -totalRotation : totalRotation) *
          easeT;

      setRotation(currentRotation);

      if (elapsed < spinDuration) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        determineWinner(finalRotation);
      }
    };

    requestAnimationFrame(animate);
  };

  const determineWinner = (finalRotation: number) => {
    const sliceAngle = 360 / numSectors;
    const normalizedRotation = ((finalRotation % 360) + 360) % 360;
    const winningSector = Math.floor(normalizedRotation / sliceAngle);

    setPopupWinner(participants[winningSector] || null);
    setShowPopup(true);
  };

  const changeSpinDirection = () => {
    setSpinDirection(
      spinDirection === 'clockwise' ? 'counterclockwise' : 'clockwise',
    );
  };

  useEffect(() => {
    if (showPopup) {
      startConfetti();
      const timer = setTimeout(() => setShowPopup(false), 5000); // Hide popup after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const startConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <section className="rounded-[1.9rem] border border-amber-200/10 bg-slate-950/75 p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300/80">
            Selection
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Spin the wheel
          </h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
          {participants.length} active {participants.length === 1 ? 'risk' : 'risks'}
        </div>
      </div>

      <div className="mt-6 rounded-[1.75rem] border border-amber-200/10 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,1))] p-4 sm:p-6">
        <div className="mx-auto flex max-w-[460px] flex-col items-center">
          <div className="rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.18),transparent_62%)] p-4">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="aspect-square w-full max-w-[400px] rounded-full border-2 border-amber-200/10 shadow-[0_0_50px_rgba(251,191,36,0.12)]"
          />
          </div>

          <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={changeSpinDirection}
              disabled={participants.length === 0 || spinning}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowRightLeft className="h-4 w-4" />
              {capitalize(spinDirection)}
            </button>
            <button
              type="button"
              onClick={startSpin}
              disabled={participants.length === 0 || spinning}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-orange-300 px-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {spinning ? 'Spinning...' : 'Spin'}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPopup && popupWinner && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
            >
              <div className="flex items-center gap-3 text-cyan-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/10 text-amber-200">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300/80">
                    Selected Risk
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">
                    {popupWinner.title}
                  </h3>
                </div>
              </div>

              {popupWinner.detail && (
                <p className="mt-5 text-base leading-8 text-slate-200">
                  {popupWinner.detail}
                </p>
              )}

              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
