import React from 'react';
import { useGame } from '../context/GameContext';
import { DATA } from '../data/tracks';
import { TrendingUp, Clock, Target, Zap, X } from 'lucide-react';
import GamificationBadges from './GamificationBadges';
import Leaderboard from './Leaderboard';

interface MetricsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ isOpen, onClose }) => {
  const { completedCards, userResponses } = useGame();

  if (!isOpen) return null;

  const totalCards = DATA.reduce((sum, track) => sum + track.cards.length, 0);
  const completionRate = (completedCards.length / totalCards) * 100;

  // Calculate time spent
  const timeSpent = userResponses.reduce((sum, response) => {
    return sum + 15; // Assume 15 min per protocol
  }, 0);
  const hoursSpent = Math.floor(timeSpent / 60);
  const minutesSpent = timeSpent % 60;

  // Get next recommended card
  const getNextCard = () => {
    for (const track of DATA) {
      for (const card of track.cards) {
        if (!completedCards.includes(card.id)) {
          return { card, track };
        }
      }
    }
    return null;
  };

  const nextCard = getNextCard();

  // Track statistics
  const trackStats = DATA.map(track => ({
    title: track.title,
    color: track.color,
    completed: track.cards.filter(c => completedCards.includes(c.id)).length,
    total: track.cards.length,
    percentage: (track.cards.filter(c => completedCards.includes(c.id)).length / track.cards.length) * 100
  }));

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg border border-neutral-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-neutral-900 border-b border-neutral-700 p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-500" />
              <h2 className="text-xl font-black text-white">Suas Metricas</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-neutral-700 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Completion Rate */}
              <div className="bg-neutral-800 rounded p-4 border border-neutral-700">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-purple-500" />
                  <p className="text-xs font-mono text-gray-400">Taxa de Conclusao</p>
                </div>
                <p className="text-3xl font-black text-white">{Math.round(completionRate)}%</p>
                <p className="text-xs text-gray-500 mt-1">{completedCards.length} de {totalCards} protocolos</p>
              </div>

              {/* Time Spent */}
              <div className="bg-neutral-800 rounded p-4 border border-neutral-700">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-cyan-500" />
                  <p className="text-xs font-mono text-gray-400">Tempo Investido</p>
                </div>
                <p className="text-3xl font-black text-white">
                  {hoursSpent}h {minutesSpent}m
                </p>
                <p className="text-xs text-gray-500 mt-1">Em {userResponses.length} protocolos</p>
              </div>

              {/* Strategies Created */}
              <div className="bg-neutral-800 rounded p-4 border border-neutral-700">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <p className="text-xs font-mono text-gray-400">Estrategias Criadas</p>
                </div>
                <p className="text-3xl font-black text-white">{userResponses.length}</p>
                <p className="text-xs text-gray-500 mt-1">Prontas para aplicar</p>
              </div>
            </div>

            {/* Track Progress */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-white">Progresso por Etapa</h3>
              {trackStats.map(track => (
                <div key={track.title} className="bg-neutral-800 rounded p-4 border border-neutral-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-sm font-black text-${track.color}-500`}>{track.title}</h4>
                    <span className="text-xs font-mono text-gray-400">{track.completed}/{track.total}</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-${track.color}-500 transition-all duration-500`}
                      style={{ width: `${track.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Next Recommendation */}
            {nextCard && (
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded p-4 border border-purple-700/50">
                <h3 className="text-sm font-black text-white mb-2">Proximo Protocolo Recomendado</h3>
                <p className="text-sm text-gray-300 mb-1">{nextCard.card.cardTitle}</p>
                <p className="text-xs text-gray-400">{nextCard.track.title} • {nextCard.card.cardSubtitle}</p>
              </div>
            )}

            {/* Completion Message */}
            {completedCards.length === totalCards && (
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded p-4 border border-green-700/50">
                <p className="text-sm text-green-400 font-black">Parabens!</p>
                <p className="text-xs text-gray-300 mt-1">Voce completou o BLACK BOX OS! Agora eh hora de aplicar todas essas estrategias e transformar sua vida.</p>
              </div>
            )}

            {/* Gamification Section */}
            <div className="border-t border-neutral-700 pt-6">
              <h3 className="text-sm font-black text-white mb-4">Gamificacao</h3>
              <GamificationBadges />
            </div>

            {/* Leaderboard Section */}
            <div className="border-t border-neutral-700 pt-6">
              <Leaderboard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MetricsDashboard;
