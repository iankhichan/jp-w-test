import React from 'react';
import { TickerDisplay } from './ticker-display';
import { Bubbles } from './animation/anim.wrapper';

export const JackpotWidget: React.FC = () => {
  return (
    <header className="bg-purple-500 text-white px-4 py-2 flex items-center justify-between rounded-lg shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-300 flex items-center justify-center rounded-full">
          <img
            src="https://placehold.co/24x24"
            alt="Crown Icon"
            className="w-6 h-6"
          />
        </div>

        <div>
          <p className="text-sm font-medium">Mega Jackpot</p>
          <div className="text-lg font-bold flex">
            Ft &nbsp;
            <TickerDisplay variant="no-style" />
          </div>
        </div>
      </div>

      {/* <Bubbles /> */}
      <button className="flex items-center gap-1 bg-purple-300 hover:bg-purple-400 text-xs font-semibold text-purple-900 px-4 py-2 rounded-md transition">
        OPT IN
        <span className="text-purple-900">&#9662;</span>
      </button>
    </header>
  );
};
