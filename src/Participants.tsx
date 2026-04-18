import { FC, useState } from 'react';
import {
  ArrowDownAZ,
  Plus,
  Shuffle,
} from 'lucide-react';

import { MAX_RISKS } from './App';
import { RiskEntry } from './types';

interface ParticipantsProps {
  handleAddRisk: (title: string) => void;
  handleRemoveRisk: (index: number) => void;
  shuffleRisks: () => void;
  sortRisks: () => void;
  risks: RiskEntry[];
}

export const Participants: FC<ParticipantsProps> = ({
  handleAddRisk,
  handleRemoveRisk,
  shuffleRisks,
  sortRisks,
  risks,
}) => {
  const [riskTitle, setRiskTitle] = useState('');
  const [error, setError] = useState('');

  const isMaxRisksReached = risks.length >= MAX_RISKS;
  const hasRisks = risks.length > 0;

  const validateInput = (title: string) => {
    if (!title.trim()) {
      return 'Risk title cannot be empty.';
    }
    return '';
  };

  const handleAddParticipant = () => {
    const validationError = validateInput(riskTitle);
    if (validationError) {
      setError(validationError);
    } else {
      handleAddRisk(riskTitle.trim());
      setRiskTitle('');
      setError('');
    }
  };

  return (
    <section className="rounded-[1.9rem] border border-amber-200/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300/80">
            Entries
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Wheel list
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Titles only on screen. Full descriptions still appear after a spin.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={shuffleRisks}
            disabled={!hasRisks}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Shuffle className="h-4 w-4" />
            Shuffle
          </button>
          <button
            type="button"
            onClick={sortRisks}
            disabled={!hasRisks}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowDownAZ className="h-4 w-4" />
            Sort
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <label
          htmlFor="risk-title"
          className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50"
        >
          Add title
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id="risk-title"
            disabled={isMaxRisksReached}
            type="text"
            placeholder="Enter a risk title"
            value={riskTitle}
            onChange={(e) => setRiskTitle(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                handleAddParticipant();
              }
            }}
            className="min-h-14 flex-1 rounded-2xl border border-white/10 bg-slate-950/80 px-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
          />
          <button
            type="button"
            disabled={isMaxRisksReached}
            onClick={handleAddParticipant}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-orange-300 px-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
        {isMaxRisksReached && (
          <p className="mt-2 text-sm text-amber-200">
            You’ve reached the {MAX_RISKS}-risk limit for the wheel.
          </p>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {risks.map((risk, index) => (
          <article
            key={`${risk.title}-${index}`}
            className="rounded-[1.4rem] border border-white/10 bg-gradient-to-r from-slate-900/95 to-slate-950/80 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/70">
                  Risk {index + 1}
                </p>
                <h3 className="mt-1 truncate text-lg font-semibold text-white">
                  {risk.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveRisk(index)}
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-rose-300/20 bg-rose-300/10 px-4 text-sm font-medium text-rose-100 transition hover:bg-rose-300/20"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
