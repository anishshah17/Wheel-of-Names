"use client";

import { useEffect, useRef, useState } from 'react';
import { MeshGradient, PulsingBorder } from '@paper-design/shaders-react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Coins,
  Orbit,
  PhoneCall,
  Presentation,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

import { cn } from '@/lib/utils';

interface ShaderShowcaseProps {
  mitigatedCount?: number;
  onPrimaryAction?: () => void;
  riskCount?: number;
}

const spotlightCards = [
  {
    icon: PhoneCall,
    kicker: 'Family Communication',
    title: 'Calls backed by a master spreadsheet kept every household aligned.',
  },
  {
    icon: Coins,
    kicker: 'Funding Shortage',
    title: 'Tiered sponsorships created cushion against venue changes and capacity shifts.',
  },
  {
    icon: Presentation,
    kicker: 'Workshop Attendance',
    title: 'Reminders, calls, and slide deck follow-ups protected summer learning.',
  },
];

const orbitText =
  'DECA PMCD • Communication • Funding • Workshops • Risk Review • ';

export default function ShaderShowcase({
  mitigatedCount = 0,
  onPrimaryAction,
  riskCount = 0,
}: ShaderShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black"
    >
      <svg className="absolute inset-0 h-0 w-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              baseFrequency="0.005"
              numOctaves="1"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={['#020617', '#06b6d4', '#0f172a', '#f97316', '#082f49']}
        speed={0.22}
        distortion={0.22}
        swirl={0.45}
        grainOverlay={0.08}
      />
      <MeshGradient
        className="absolute inset-0 h-full w-full opacity-45"
        colors={['#000000', '#ffffff', '#06b6d4', '#f97316']}
        speed={0.15}
        distortion={0.4}
        swirl={0.7}
        grainMixer={0.12}
        grainOverlay={0.15}
      />

      <div
        className={cn(
          'absolute inset-0 bg-hero-grid bg-[size:64px_64px] transition-opacity duration-500',
          isActive ? 'opacity-20' : 'opacity-10',
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.22),transparent_35%)]" />

      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 360, damping: 20 }}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.15] bg-white/10 text-white shadow-glow backdrop-blur-md">
            <Orbit className="h-5 w-5" />
          </div>
          <div>
            <p className="font-['Space_Grotesk'] text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
              Wheel of Names
            </p>
            <p className="text-sm text-white/[0.85]">DECA PMCD Risk Studio</p>
          </div>
        </motion.div>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-md md:flex">
          {['Risks', 'Mitigations', 'Workshops'].map((item) => (
            <a
              key={item}
              href="#risk-studio"
              className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <div
          id="gooey-btn"
          className="relative hidden items-center group sm:flex"
          style={{ filter: 'url(#gooey-filter)' }}
        >
          <button
            type="button"
            className="absolute right-0 flex h-10 -translate-x-11 items-center justify-center rounded-full bg-white px-3 text-black transition-all duration-300 group-hover:-translate-x-20"
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onPrimaryAction}
            className="relative z-10 flex h-10 items-center gap-2 rounded-full bg-white px-6 text-xs font-semibold uppercase tracking-[0.22em] text-black"
          >
            Open Studio
          </button>
        </div>
      </header>

      <div className="relative z-20 mx-auto flex min-h-[calc(100vh-92px)] w-full max-w-7xl flex-col justify-between gap-12 px-6 pb-12 pt-4 lg:flex-row lg:items-end">
        <main className="max-w-3xl py-8 lg:py-14">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
            style={{ filter: 'url(#glass-effect)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Sparkles className="h-4 w-4 text-cyan-300" />
            <span className="text-sm font-medium tracking-wide text-white/90">
              A more cinematic way to review PMCD project risks
            </span>
          </motion.div>

          <motion.h1
            className="mt-8 font-['Space_Grotesk'] text-5xl font-bold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <span
              className="block bg-gradient-to-r from-white via-cyan-300 to-orange-300 bg-clip-text text-transparent"
              style={{ filter: 'url(#text-glow)' }}
            >
              Spin Through
            </span>
            <span className="block">Your DECA PMCD</span>
            <span className="block text-white/70">Risk Playbook</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.72] sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            Review your communication, funding, and workshop attendance
            strategies in a format that feels polished, interactive, and
            presentation-ready for judges, teammates, or practice sessions.
          </motion.p>

          <motion.div
            className="mt-8 grid gap-4 sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                Risks Loaded
              </p>
              <p className="mt-2 text-3xl font-bold text-white">{riskCount}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                Mitigations Ready
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {mitigatedCount}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                Review Mode
              </p>
              <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-white">
                <ShieldAlert className="h-5 w-5 text-orange-300" />
                Interactive
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
          >
            <motion.button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-orange-300 px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-glow"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Review Risks
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.a
              href="#risk-studio"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              See Mitigations
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </main>

        <aside className="w-full max-w-xl space-y-4 pb-8 lg:pb-16">
          {spotlightCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.kicker}
                className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.25 + index * 0.15 }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                      {card.kicker}
                    </p>
                    <p className="mt-3 max-w-sm text-lg font-semibold leading-7 text-white">
                      {card.title}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </aside>
      </div>

      <div className="absolute bottom-8 right-8 z-30 hidden md:block">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <PulsingBorder
            colors={['#06b6d4', '#0891b2', '#f97316', '#ffffff']}
            colorBack="#00000000"
            speed={1.2}
            roundness={1}
            thickness={0.1}
            softness={0.2}
            intensity={0.65}
            bloom={0.8}
            spots={4}
            spotSize={0.1}
            pulse={0.1}
            smoke={0.45}
            smokeSize={0.55}
            scale={0.65}
            rotation={0}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
            }}
          />

          <motion.svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            style={{ transform: 'scale(1.7)' }}
          >
            <defs>
              <path
                id="orbit-circle"
                d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              />
            </defs>
            <text className="fill-white/80 text-[7px] font-medium uppercase tracking-[0.35em]">
              <textPath href="#orbit-circle" startOffset="0%">
                {orbitText.repeat(2)}
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>
    </div>
  );
}
