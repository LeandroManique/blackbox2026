import React from 'react';
import { X, Crown, Fingerprint, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackName?: string;
}

const AchievementModal: React.FC<AchievementModalProps> = ({ isOpen, onClose, trackName = "Geral" }) => {
  
  // Lógica de texto baseada na trilha
  const getMessage = () => {
    const name = trackName.toLowerCase();
    
    if (name.includes('mestre') || name.includes('autoridade') || name.includes('authority')) {
      return {
        title: "AUTORIDADE CONFIRMADA",
        text: "Você encontrou sua voz. Enquanto a maioria apenas faz barulho, você decidiu criar sinal. A autoridade não é um presente, é uma construção. Hoje, você colocou o tijolo final. O mercado vai te ouvir."
      };
    }
    
    if (name.includes('vendedor') || name.includes('loja') || name.includes('shop')) {
      return {
        title: "CÓDIGO DE VENDA ATIVO",
        text: "Você dominou a arte da oferta. A maioria tem vergonha de vender, e por isso continuam presos. Você quebrou o ciclo. A verdadeira liberdade não é sobre likes, é sobre conversão. O jogo virou."
      };
    }

    if (name.includes('criador') || name.includes('influencer')) {
      return {
        title: "A TELA PRETA SE FOI",
        text: "O medo da câmera paralisa 90% dos talentos. Você venceu o julgamento alheio. Sua mensagem agora é maior que seu medo. Bem-vindo ao outro lado da tela."
      };
    }

    // Default (Setup / Início)
    return {
      title: "PROTOCOLO DE ELITE",
      text: "O algoritmo é matemático, mas ele curva-se diante da consistência. Eu sei que você pensou em desistir. Mas você ficou. Você não é mais plateia. Você é protagonista."
    };
  };

  const content = getMessage();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          
          {/* BACKDROP DRAMÁTICO */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#000000]/95 backdrop-blur-md"
          />

          {/* O CARTÃO PREMIADO */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative w-full max-w-md bg-gradient-to-b from-neutral-900 to-black border border-neutral-800 rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.05)] overflow-hidden"
          >
            
            {/* LUZ DE TOPO */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />

            <div className="p-8 text-center flex flex-col items-center">
              
              {/* ÍCONE PULSANTE */}
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse"></div>
                <div className="relative bg-neutral-900 border border-neutral-800 p-4 rounded-full text-yellow-500 shadow-2xl">
                  <Crown size={32} strokeWidth={1.5} />
                </div>
              </div>

              {/* TÍTULO */}
              <h2 className="text-xl font-mono font-bold text-white tracking-widest uppercase mb-4">
                {content.title}
              </h2>

              {/* MENSAGEM EMOCIONAL */}
              <div className="relative">
                <p className="text-neutral-400 text-sm leading-relaxed font-light italic">
                  "{content.text}"
                </p>
                {/* Aspas decorativas */}
                <span className="absolute -top-4 -left-2 text-4xl text-neutral-800 font-serif opacity-50">“</span>
                <span className="absolute -bottom-4 -right-2 text-4xl text-neutral-800 font-serif opacity-50">”</span>
              </div>

              {/* LINHA DE ASSINATURA */}
              <div className="mt-8 pt-6 border-t border-neutral-800 w-full flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <Fingerprint size={16} className="text-neutral-600" />
                   <span className="text-[10px] uppercase tracking-widest text-neutral-600">Arthur_System_Auth</span>
                </div>
                <div className="text-[10px] text-yellow-600/50 font-mono">
                  100% COMPLETED
                </div>
              </div>

              {/* BOTÃO DE ACEITE */}
              <button 
                onClick={onClose}
                className="mt-8 w-full py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-[0.2em] hover:bg-yellow-400 transition-colors rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 group"
              >
                <Zap size={14} className="group-hover:fill-black transition-all" />
                Assimilar Conquista
              </button>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default AchievementModal;