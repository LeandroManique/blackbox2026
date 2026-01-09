import React from 'react';
import { DATA } from '../data/tracks';
import { useGame } from '../context/GameContext';
import Card from './Card';
import { CardData } from '../types';

interface TrackGridProps {
  onCardSelect: (card: CardData) => void;
}

const TrackGrid: React.FC<TrackGridProps> = ({ onCardSelect }) => {
  const { isCardUnlocked, isCardCompleted } = useGame();

  // Check if setup is fully completed (z4 is completed)
  const isSetupComplete = isCardCompleted('z4');

  return (
    <div className="space-y-16 pb-20">
      {DATA.map((track) => {
        // Setup track is always active. Others depend on setup completion.
        const isActive = track.id === 'setup' || isSetupComplete;
        
        return (
          <div 
            key={track.id} 
            className={`transition-all duration-700 ${isActive ? 'opacity-100 filter-none' : 'opacity-30 pointer-events-none grayscale'}`}
          >
            {/* Track Header */}
            <div className="mb-6 flex items-baseline gap-4 border-b border-neutral-900 pb-2">
              <h2 className={`text-3xl font-black uppercase tracking-tighter text-${track.color}-500`}>
                {track.title}
              </h2>
              <span className="text-sm font-mono text-neutral-500 uppercase">
                // {track.description}
              </span>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {track.cards.map((card) => {
                const unlocked = isCardUnlocked(card.id);
                const completed = isCardCompleted(card.id);
                
                let status: 'locked' | 'unlocked' | 'completed' = 'locked';
                if (completed) status = 'completed';
                else if (unlocked) status = 'unlocked';

                return (
                  <Card
                    key={card.id}
                    data={card}
                    status={status}
                    trackColor={track.color}
                    onClick={() => onCardSelect(card)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackGrid;
