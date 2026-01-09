import React from 'react';
import { useGame } from '../context/GameContext';
import { DATA } from '../data/tracks';
import { Zap, Target } from 'lucide-react';

const ProgressBar: React.FC = () => {
  const { completedCards } = useGame();
  
  // Calculate progress
  const totalCards = DATA.reduce((sum, track) => sum + track.cards.length, 0);
  const completedCount = completedCards.length;
  const progressPercentage = (completedCount / totalCards) * 100;
  
  // Calculate progress per track
  const trackProgress = DATA.map(track => ({
    id: track.id,
    title: track.title,
    color: track.color,
    completed: track.cards.filter(card => completedCards.includes(card.id)).length,
    total: track.cards.length
  }));
  
  // Estimate time remaining (assuming 15 min per card)
  const minutesPerCard = 15;
  const minutesRemaining = (totalCards - completedCount) * minutesPerCard;
  const hoursRemaining = Math.ceil(minutesRemaining / 60);
  
  return (
    <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-lg p-6 border border-neutral-700 mb-8">
      {/* Main Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-black text-white">SEU PROGRESSO</h3>
          </div>
          <span className="text-sm font-mono text-gray-400">
            {completedCount} de {totalCards} protocolos concluídos
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-neutral-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Percentage and Time */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-mono text-gray-400">
            {Math.round(progressPercentage)}% completo
          </span>
          <span className="text-sm font-mono text-gray-400">
            ~{hoursRemaining}h restante
          </span>
        </div>
      </div>
      
      {/* Track-by-Track Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trackProgress.map(track => (
          <div 
            key={track.id}
            className="bg-neutral-800 rounded p-4 border border-neutral-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-gray-400" />
              <h4 className={`text-sm font-black uppercase text-${track.color}-500`}>
                {track.title}
              </h4>
            </div>
            
            <div className="mb-2">
              <div className="w-full h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-${track.color}-500 transition-all duration-500`}
                  style={{ width: `${(track.completed / track.total) * 100}%` }}
                />
              </div>
            </div>
            
            <span className="text-xs font-mono text-gray-400">
              {track.completed}/{track.total}
            </span>
          </div>
        ))}
      </div>
      
      {/* Motivational Message */}
      <div className="mt-6 pt-4 border-t border-neutral-700">
        {completedCount === 0 && (
          <p className="text-sm text-gray-400 font-mono">
            🚀 Comece aqui: Complete "SEU TEMA" para desbloquear os próximos passos.
          </p>
        )}
        {completedCount > 0 && completedCount < totalCards * 0.25 && (
          <p className="text-sm text-gray-400 font-mono">
            ⚡ Ótimo começo! Continue assim para desbloquear novos protocolos.
          </p>
        )}
        {completedCount >= totalCards * 0.25 && completedCount < totalCards * 0.5 && (
          <p className="text-sm text-gray-400 font-mono">
            💪 Você está indo bem! Já completou {Math.round(progressPercentage)}% do sistema.
          </p>
        )}
        {completedCount >= totalCards * 0.5 && completedCount < totalCards * 0.75 && (
          <p className="text-sm text-gray-400 font-mono">
            🔥 Metade do caminho! Mais {totalCards - completedCount} protocolos para dominar tudo.
          </p>
        )}
        {completedCount >= totalCards * 0.75 && completedCount < totalCards && (
          <p className="text-sm text-gray-400 font-mono">
            🎯 Quase lá! Apenas {totalCards - completedCount} protocolos faltando.
          </p>
        )}
        {completedCount === totalCards && (
          <p className="text-sm text-green-400 font-mono">
            ✨ PARABÉNS! Você completou o BLACK BOX OS. Agora é hora de aplicar e transformar sua vida!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
