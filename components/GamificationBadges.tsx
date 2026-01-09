import React from 'react';
import { useGame } from '../context/GameContext';
import { DATA } from '../data/tracks';
import { Trophy, Star, Zap, Award } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  requirement: () => boolean;
  color: string;
}

const GamificationBadges: React.FC = () => {
  const { completedCards } = useGame();

  const totalCards = DATA.reduce((sum, track) => sum + track.cards.length, 0);
  const points = completedCards.length * 10; // 10 pontos por card
  const completionRate = (completedCards.length / totalCards) * 100;

  // Define badges
  const badges: Badge[] = [
    {
      id: 'iniciante',
      name: 'Iniciante',
      description: 'Complete seu primeiro protocolo',
      icon: <Zap className="w-6 h-6" />,
      requirement: () => completedCards.length >= 1,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'criador',
      name: 'Criador',
      description: 'Complete a etapa "O CRIADOR"',
      icon: <Star className="w-6 h-6" />,
      requirement: () => {
        const track = DATA.find(t => t.id === 'influencer');
        return track ? track.cards.every(c => completedCards.includes(c.id)) : false;
      },
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'mestre',
      name: 'Mestre',
      description: 'Complete a etapa "O MESTRE"',
      icon: <Trophy className="w-6 h-6" />,
      requirement: () => {
        const track = DATA.find(t => t.id === 'master');
        return track ? track.cards.every(c => completedCards.includes(c.id)) : false;
      },
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'vendedor',
      name: 'Vendedor',
      description: 'Complete a etapa "O VENDEDOR"',
      icon: <Award className="w-6 h-6" />,
      requirement: () => {
        const track = DATA.find(t => t.id === 'seller');
        return track ? track.cards.every(c => completedCards.includes(c.id)) : false;
      },
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'expert',
      name: 'Expert',
      description: 'Complete o BLACK BOX OS inteiro',
      icon: <Trophy className="w-6 h-6" />,
      requirement: () => completedCards.length === totalCards,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const earnedBadges = badges.filter(b => b.requirement());
  const nextBadge = badges.find(b => !b.requirement());

  // Calculate level
  const getLevelInfo = () => {
    if (completedCards.length === 0) return { name: 'Iniciante', color: 'text-gray-400', icon: '🥚' };
    if (completionRate < 25) return { name: 'Bronze', color: 'text-orange-600', icon: '🥉' };
    if (completionRate < 50) return { name: 'Prata', color: 'text-gray-400', icon: '🥈' };
    if (completionRate < 75) return { name: 'Ouro', color: 'text-yellow-500', icon: '🥇' };
    return { name: 'Platina', color: 'text-cyan-400', icon: '💎' };
  };

  const level = getLevelInfo();

  return (
    <div className="space-y-6">
      {/* Points and Level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Points */}
        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded p-4 border border-purple-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h3 className="text-sm font-black text-white">Seus Pontos</h3>
          </div>
          <p className="text-3xl font-black text-yellow-400">{points} XP</p>
          <p className="text-xs text-gray-400 mt-1">{completedCards.length} protocolos × 10 pontos</p>
        </div>

        {/* Level */}
        <div className={`bg-gradient-to-br from-${level.color === 'text-gray-400' ? 'gray' : level.color === 'text-orange-600' ? 'orange' : level.color === 'text-yellow-500' ? 'yellow' : 'cyan'}-900/30 to-${level.color === 'text-gray-400' ? 'gray' : level.color === 'text-orange-600' ? 'orange' : level.color === 'text-yellow-500' ? 'yellow' : 'cyan'}-900/30 rounded p-4 border border-${level.color === 'text-gray-400' ? 'gray' : level.color === 'text-orange-600' ? 'orange' : level.color === 'text-yellow-500' ? 'yellow' : 'cyan'}-700/50`}>
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="text-sm font-black text-white">Seu Nível</h3>
          </div>
          <p className="text-3xl font-black text-white">{level.icon} {level.name}</p>
          <p className="text-xs text-gray-400 mt-1">{Math.round(completionRate)}% do sistema</p>
        </div>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div>
          <h3 className="text-sm font-black text-white mb-3">Suas Conquistas</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {earnedBadges.map(badge => (
              <div
                key={badge.id}
                className={`bg-gradient-to-br ${badge.color} rounded p-4 border border-white/20 text-center`}
              >
                <div className="flex justify-center mb-2 text-white">{badge.icon}</div>
                <p className="text-xs font-black text-white">{badge.name}</p>
                <p className="text-[10px] text-white/80 mt-1">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Badge */}
      {nextBadge && (
        <div className="bg-neutral-800 rounded p-4 border border-neutral-700">
          <h3 className="text-sm font-black text-white mb-2">Próxima Conquista</h3>
          <div className="flex items-center gap-3">
            <div className="text-3xl opacity-50">{nextBadge.icon}</div>
            <div className="flex-1">
              <p className="text-sm font-black text-white">{nextBadge.name}</p>
              <p className="text-xs text-gray-400">{nextBadge.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamificationBadges;
