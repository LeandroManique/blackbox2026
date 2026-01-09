import React from 'react';
import { useGame } from '../context/GameContext';
import { DATA } from '../data/tracks';
import { Crown, Medal } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const { completedCards } = useGame();

  // Simulated leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Arthur (IA)', points: 9999, level: 'Platina', isYou: false },
    { rank: 2, name: 'Você', points: completedCards.length * 10, level: 'Seu Nível', isYou: true },
    { rank: 3, name: 'Criador #1', points: 450, level: 'Ouro', isYou: false },
    { rank: 4, name: 'Criador #2', points: 380, level: 'Ouro', isYou: false },
    { rank: 5, name: 'Criador #3', points: 320, level: 'Prata', isYou: false },
  ].sort((a, b) => {
    // Keep Arthur at top, then sort by points
    if (a.name === 'Arthur (IA)') return -1;
    if (b.name === 'Arthur (IA)') return 1;
    return b.points - a.points;
  }).map((item, idx) => ({ ...item, rank: idx + 1 }));

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-black text-white flex items-center gap-2">
        <Crown className="w-4 h-4 text-yellow-500" />
        Ranking Global
      </h3>

      <div className="space-y-2">
        {leaderboardData.map((entry) => (
          <div
            key={entry.rank}
            className={`rounded p-4 border flex items-center justify-between ${
              entry.isYou
                ? 'bg-purple-900/30 border-purple-700/50'
                : 'bg-neutral-800 border-neutral-700'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Medal */}
              {entry.rank === 1 && <span className="text-2xl">🥇</span>}
              {entry.rank === 2 && <span className="text-2xl">🥈</span>}
              {entry.rank === 3 && <span className="text-2xl">🥉</span>}
              {entry.rank > 3 && (
                <span className="text-sm font-black text-gray-500 w-6 text-center">
                  #{entry.rank}
                </span>
              )}

              {/* Name and Level */}
              <div>
                <p className="text-sm font-black text-white">
                  {entry.name} {entry.isYou && '(Você)'}
                </p>
                <p className="text-xs text-gray-400">{entry.level}</p>
              </div>
            </div>

            {/* Points */}
            <p className="text-lg font-black text-yellow-400">{entry.points} XP</p>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-neutral-800 rounded p-3 border border-neutral-700">
        <p className="text-xs text-gray-400 text-center">
          💡 Ganhe 10 XP por cada protocolo completado. Suba no ranking!
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
