import { useState } from 'react';

import { Participants } from './Participants';
import { Wheel } from './Wheel';
import { RiskEntry } from './types';

import './App.css';

export const MAX_RISKS = 18;

const DEFAULT_RISKS: RiskEntry[] = [
  {
    title: 'Family Communication',
    detail:
      "In a world of automated replies and overflowing inboxes, we knew our families deserved more than just another notification. We realized that while emails are efficient, they lack the clarity of a human voice. We mitigated this risk by using a master communication spreadsheet and communicated with families through calls to ensure total understanding was reached.",
  },
  {
    title: 'Funding Shortage',
    detail:
      "We're lucky enough to live in a community so eager to help with fundraising for our program, but we had a risk of shortage of funding due to unforeseen venue changes and max program capacity. We used a tiered sponsorship approach along with reaching out to businesses in the community to fund the program.",
  },
  {
    title: 'Workshop Attendance',
    detail:
      'Would you consider yourself busy during the summer? Exactly! This is what led to a risk of attendance at pre-fair workshops. We used a twofold approach: our team sent reminders and called families about the workshops, along with sending our slide decks afterward to ensure all students gained knowledge.',
  },
];

function App() {
  const [risks, setRisks] = useState<RiskEntry[]>(DEFAULT_RISKS);

  const handleAddRisk = (title: string) => {
    if (risks.length < MAX_RISKS) {
      setRisks([...risks, { title, detail: '' }]);
    }
  };

  const handleRemoveRisk = (index: number) => {
    setRisks(risks.filter((_, i) => i !== index));
  };

  const shuffleRisks = () => {
    const shuffledRisks = [...risks].sort(() => Math.random() - 0.5);
    setRisks(shuffledRisks);
  };

  const sortRisks = () => {
    const sortedRisks = [...risks].sort((a, b) =>
      a.title.localeCompare(b.title),
    );
    setRisks(sortedRisks);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.12),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80">
              DECA PMCD
            </p>
            <h1 className="mt-3 font-['Space_Grotesk'] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Risk Wheel
            </h1>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              Spin to choose which risk your team reviews next.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_1fr]">
            <Participants
              handleAddRisk={handleAddRisk}
              handleRemoveRisk={handleRemoveRisk}
              shuffleRisks={shuffleRisks}
              sortRisks={sortRisks}
              risks={risks}
            />
            <Wheel participants={risks} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
