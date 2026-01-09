import React from 'react';
import { CardData } from '../types';
import { Check, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface CardProps {
  data: CardData;
  status: 'locked' | 'unlocked' | 'completed';
  trackColor: string;
  onClick: () => void;
}

const colorMap: Record<string, { border: string, shadow: string, text: string, hover: string }> = {
  stone: {
    border: 'border-stone-500',
    shadow: 'shadow-stone-500/30',
    text: 'text-stone-500',
    hover: 'hover:shadow-stone-500/50'
  },
  cyan: {
    border: 'border-cyan-500',
    shadow: 'shadow-cyan-500/30',
    text: 'text-cyan-500',
    hover: 'hover:shadow-cyan-500/50'
  },
  red: {
    border: 'border-red-600',
    shadow: 'shadow-red-600/30',
    text: 'text-red-600',
    hover: 'hover:shadow-red-600/50'
  },
  emerald: {
    border: 'border-emerald-500',
    shadow: 'shadow-emerald-500/30',
    text: 'text-emerald-500',
    hover: 'hover:shadow-emerald-500/50'
  },
};

const Card: React.FC<CardProps> = ({ data, status, trackColor, onClick }) => {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const theme = colorMap[trackColor] || colorMap['stone'];

  // Base classes
  const baseClasses = "h-48 rounded-xl border p-6 flex flex-col justify-between relative transition-all duration-300";
  
  // Specific classes based on status
  let statusClasses = "";
  if (isLocked) {
    statusClasses = "border-neutral-900 bg-neutral-900/40 opacity-50 grayscale cursor-not-allowed";
  } else {
    // Unlocked or Completed
    statusClasses = `bg-neutral-950 ${theme.border} shadow-[0_0_15px_rgba(0,0,0,0)] ${theme.shadow} cursor-pointer hover:-translate-y-1 ${theme.hover}`;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${baseClasses} ${statusClasses}`}
      onClick={!isLocked ? onClick : undefined}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-bold text-lg uppercase tracking-wider ${isLocked ? 'text-neutral-500' : 'text-gray-100'}`}>
            {data.cardTitle}
          </h3>
          <p className="text-xs font-mono mt-1 text-neutral-400 uppercase">
            {data.cardSubtitle}
          </p>
        </div>
        
        {isCompleted && (
          <div className={`p-1 rounded-full bg-${trackColor}-500/20 text-${trackColor}-500 border border-${trackColor}-500/50`}>
            <Check size={16} className={theme.text} />
          </div>
        )}
        
        {isLocked && (
          <Lock size={16} className="text-neutral-700" />
        )}
      </div>

      <div className="w-full">
        {/* Decorative ID */}
        <div className="text-[10px] font-mono text-neutral-700 mb-2 text-right">
          ID: {data.id.toUpperCase()}
        </div>
        
        {/* Progress Bar Line */}
        <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
          <div 
            className={`h-full ${isCompleted ? `bg-${trackColor}-500 ${theme.text.replace('text', 'bg')}` : isLocked ? 'bg-transparent' : 'bg-neutral-700'}`} 
            style={{ width: isCompleted ? '100%' : '0%' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
