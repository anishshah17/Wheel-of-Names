import React, { useState } from 'react';
import { PencilLine, Sparkles } from 'lucide-react';

interface QuestionProps {
  initialQuestion?: string;
}

export const Question = ({
  initialQuestion = 'What is your question?',
}: QuestionProps) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [editable, setEditable] = useState(false);

  const handleClick = () => {
    setEditable(true);
  };

  const handleBlur = () => {
    setEditable(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setEditable(false);
    }
  };

  return (
    <section className="rounded-[1.9rem] border border-white/10 bg-slate-950/55 p-6 shadow-2xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200/70">
            Review Prompt
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Set the focus before you spin
          </h2>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
        >
          <PencilLine className="h-4 w-4" />
          {editable ? 'Editing' : 'Edit Prompt'}
        </button>
      </div>

      {editable ? (
        <input
          ref={(input) => input?.focus()}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="mt-6 min-h-14 w-full rounded-[1.5rem] border border-cyan-300/20 bg-slate-900/80 px-5 text-lg text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60"
        />
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="mt-6 flex w-full items-start gap-4 rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.04] p-5 text-left transition hover:border-cyan-300/25 hover:bg-white/10"
        >
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
              Current Prompt
            </p>
            <h3 className="mt-2 text-2xl font-semibold leading-8 text-white">
              {question}
            </h3>
          </div>
        </button>
      )}
    </section>
  );
};
