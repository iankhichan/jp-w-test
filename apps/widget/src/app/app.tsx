// import { ExpandedBanner } from './jackpot-widget';
import { DraggableStickyWidget } from './sticky-widget';
import JPIcon from '../assets/jp.svg?react';

export function App() {
  return (
    <div>
      {/* <ExpandedBanner /> */}
      {/* <DraggableStickyWidget className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-[300px]"> */}
      <DraggableStickyWidget className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <JPIcon />

        {/* 
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Draggable Widget
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Drag me around! I'll snap to the nearest edge when you release.
          </p>
        </div> */}
      </DraggableStickyWidget>
    </div>
  );
}
