import React, { useState } from 'react';
import { Sparkles, TrendingUp, Zap, ShoppingCart } from 'lucide-react';

interface PersonaSelectorModalProps {
  onSelect: (persona: 'ugc' | 'influencer' | 'viral' | 'seller') => Promise<void>;
  isLoading?: boolean;
}

const personas = [
  {
    id: 'ugc' as const,
    title: 'Criador de UGC',
    description: 'Crio vídeos para marcas e ganho por cada aceitação',
    icon: Sparkles,
    color: 'from-purple-600 to-purple-400',
    benefit: 'Taxa de aceitação 60%+',
  },
  {
    id: 'influencer' as const,
    title: 'Influenciador',
    description: 'Quero viralizar e ganhar dinheiro com meu conteúdo',
    icon: TrendingUp,
    color: 'from-pink-600 to-pink-400',
    benefit: '10x mais visualizações',
  },
  {
    id: 'viral' as const,
    title: 'Quero Viralizar',
    description: 'Não sei exatamente para quê, mas quero viralizar',
    icon: Zap,
    color: 'from-amber-600 to-amber-400',
    benefit: '10k seguidores em 30 dias',
  },
  {
    id: 'seller' as const,
    title: 'Vendedor TikTok Shop',
    description: 'Vendo produtos no TikTok Shop e quero vender mais',
    icon: ShoppingCart,
    color: 'from-emerald-600 to-emerald-400',
    benefit: 'Conversão 8%+',
  },
];

const PersonaSelectorModal: React.FC<PersonaSelectorModalProps> = ({ onSelect, isLoading = false }) => {
  const [selectedPersona, setSelectedPersona] = useState<'ugc' | 'influencer' | 'viral' | 'seller' | null>(null);

  const handleSelect = async (persona: 'ugc' | 'influencer' | 'viral' | 'seller') => {
    setSelectedPersona(persona);
    try {
      await onSelect(persona);
    } catch (error) {
      console.error('Erro ao selecionar persona:', error);
      setSelectedPersona(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg border border-neutral-700 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-6 border-b border-neutral-700">
          <h1 className="text-3xl font-black text-white mb-2">Qual é Seu Objetivo?</h1>
          <p className="text-white/80">Escolha seu caminho e comece a transformar sua vida</p>
        </div>

        {/* Grid de Personas */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {personas.map((persona) => {
            const Icon = persona.icon;
            const isSelected = selectedPersona === persona.id;
            const isLoading_ = isLoading && isSelected;

            return (
              <button
                key={persona.id}
                onClick={() => handleSelect(persona.id)}
                disabled={isLoading && !isSelected}
                className={`relative p-6 rounded-lg border-2 transition-all text-left group ${
                  isSelected
                    ? `border-${persona.color.split(' ')[0].split('-')[1]}-500 bg-${persona.color.split(' ')[0].split('-')[1]}-500/10`
                    : 'border-neutral-600 bg-neutral-800/50 hover:border-neutral-500 hover:bg-neutral-800'
                } ${isLoading && !isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {/* Loading Spinner */}
                {isLoading_ && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${persona.color} p-3 mb-4 flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text"
                    style={isSelected ? { backgroundImage: `linear-gradient(to right, var(--color-start), var(--color-end))` } : {}}>
                  {persona.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4">{persona.description}</p>

                {/* Benefit */}
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${persona.color}`}>
                  {persona.benefit}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 px-6 py-4 border-t border-neutral-700 bg-neutral-900/50 backdrop-blur text-xs text-gray-500 text-center">
          Você pode mudar sua escolha a qualquer momento nas configurações
        </div>
      </div>
    </div>
  );
};

export default PersonaSelectorModal;
