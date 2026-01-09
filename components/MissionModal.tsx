import React, { useState, useEffect } from 'react';
import { CardData } from '../types';
import { X, Terminal, ClipboardList, Zap, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatTerminal from './ChatTerminal';

interface MissionModalProps {
  card: CardData;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

type ViewMode = 'briefing' | 'terminal';

const MissionModal: React.FC<MissionModalProps> = ({ card, isOpen, onClose, onComplete }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('briefing');

  // Reset view mode when modal opens
  useEffect(() => {
    if (isOpen) setViewMode('briefing');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP BLUR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#050505]/90 backdrop-blur-sm"
      />

      {/* MODAL CONTAINER */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`relative w-full max-w-2xl bg-[#0a0a0a] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col ${viewMode === 'terminal' ? 'h-[600px]' : 'auto'}`}
      >
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-900/50">
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] ${
                card.id.startsWith('z') ? 'bg-stone-500 text-stone-500' :
                card.id.startsWith('i') ? 'bg-cyan-500 text-cyan-500' :
                card.id.startsWith('a') ? 'bg-red-600 text-red-600' : 'bg-emerald-500 text-emerald-500'
             }`} />
             <h2 className="text-lg font-mono font-bold tracking-widest text-white uppercase">
               {viewMode === 'briefing' ? 'PROTOCOLO DE MISSÃO' : 'TERMINAL ATIVO'}
             </h2>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="p-6 flex-1 overflow-y-auto">
          
          <AnimatePresence mode="wait">
            {viewMode === 'briefing' ? (
              <motion.div 
                key="briefing"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                {/* TÍTULO E CONCEITO */}
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white uppercase tracking-tight">
                    {card.techniqueTitle}
                  </h3>
                  <p className="text-neutral-400 text-lg leading-relaxed font-light border-l-2 border-neutral-800 pl-4">
                    {card.techniqueDescription}
                  </p>
                </div>

                {/* AREA DE BRIEFING OPERACIONAL */}
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3 text-cyan-500">
                    <ClipboardList size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Resumo da Operação</span>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-neutral-300">
                      Ao iniciar, o <strong>Black Box AI</strong> assumirá o comando. Você passará por uma entrevista guiada para extrair os dados estratégicos.
                    </p>
                    <ul className="text-xs text-neutral-500 space-y-1 list-disc list-inside">
                      <li>O sistema fará perguntas sequenciais.</li>
                      <li>Suas respostas serão analisadas em tempo real.</li>
                      <li>Ao final, você receberá a estratégia pronta para copiar.</li>
                    </ul>
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center gap-2 text-yellow-600/90 text-xs">
                     <Zap size={14} />
                     <span className="font-mono uppercase font-bold tracking-wider">AÇÃO REQUERIDA: TOME NOTA DA DECISÃO OU APLIQUE AGORA MESMO.</span>
                  </div>
                </div>

              </motion.div>
            ) : (
              <motion.div 
                key="terminal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="h-full"
              >
                <ChatTerminal 
                  initialCommand={card.activationCommand} 
                  onComplete={() => onComplete()}
                  cardId={card.id}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* FOOTER ACTIONS */}
        {viewMode === 'briefing' && (
          <div className="p-6 border-t border-neutral-800 bg-neutral-900/30 flex items-center justify-between">
            {/* Esquerda: Cancelar */}
            <button 
              onClick={onClose}
              className="text-xs font-mono font-bold text-neutral-600 hover:text-white transition-colors uppercase tracking-wider px-2"
            >
              Cancelar
            </button>

            {/* Direita: Ações Principais */}
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => onComplete()}
                  className="px-4 py-3 rounded border border-neutral-800 text-neutral-400 text-xs font-mono font-bold hover:bg-neutral-800 hover:text-white transition-all uppercase tracking-widest flex items-center gap-2"
                >
                  <CheckCircle2 size={14} />
                  Marcar como Feito
                </button>

                <button 
                  onClick={() => setViewMode('terminal')}
                  className="px-6 py-3 rounded bg-white text-black text-xs font-mono font-bold hover:bg-cyan-400 hover:scale-105 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2"
                >
                  <Terminal size={14} />
                  Iniciar Protocolo
                </button>
            </div>
          </div>
        )}
        
        {/* Footer no modo Terminal: Botão de Voltar discreto */}
        {viewMode === 'terminal' && (
           <div className="absolute top-6 right-14 z-50">
              <button 
                 onClick={() => setViewMode('briefing')}
                 className="text-[10px] uppercase tracking-widest text-neutral-600 hover:text-white transition-colors bg-black/50 px-2 py-1 rounded border border-white/10"
              >
                 Voltar ao Briefing
              </button>
           </div>
        )}

      </motion.div>
    </div>
  );
};

export default MissionModal;