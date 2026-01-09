import React, { useState } from 'react';
import { Zap, Users, TrendingUp, ShoppingCart, ChevronRight } from 'lucide-react';

interface PersonaSelectorProps {
  onSelect: (persona: 'ugc' | 'influencer' | 'viral' | 'seller') => void;
}

const personas = [
  {
    id: 'ugc',
    title: 'Criador de UGC',
    description: 'Criar conteúdo para marcas e ganhar dinheiro',
    icon: <Users className="w-8 h-8" />,
    color: 'from-blue-600 to-cyan-600',
    benefits: [
      'Taxa de aceitação: 30% → 80%',
      'Ganho: R$50 → R$500+ por vídeo',
      'Portfólio contratável',
      'Acesso a plataformas de vendas'
    ],
    timeline: '2-3 semanas'
  },
  {
    id: 'influencer',
    title: 'Influenciador',
    description: 'Viralizar e ganhar dinheiro com TikTok/Instagram',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'from-purple-600 to-pink-600',
    benefits: [
      'Quick win em 3 dias',
      'Roteiros prontos para gravar',
      'Análise de vídeos em tempo real',
      'Crescimento mensurável'
    ],
    timeline: '1-2 meses'
  },
  {
    id: 'viral',
    title: 'Quero Viralizar',
    description: 'Viralizar (mas ainda não sei exatamente para quê)',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-yellow-600 to-orange-600',
    benefits: [
      'Descobrir seu propósito real',
      'Testar nichos em 3 dias',
      'Desafio de 30 dias',
      'Comunidade de accountability'
    ],
    timeline: '30 dias'
  },
  {
    id: 'seller',
    title: 'Vendedor TikTok Shop',
    description: 'Vender meus produtos no TikTok Shop',
    icon: <ShoppingCart className="w-8 h-8" />,
    color: 'from-green-600 to-emerald-600',
    benefits: [
      'Funil de vendas completo',
      'Copy que converte',
      'Integração com TikTok Shop',
      'Teste A/B automático'
    ],
    timeline: '1-2 semanas'
  }
];

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    setTimeout(() => {
      onSelect(id as 'ugc' | 'influencer' | 'viral' | 'seller');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg border border-neutral-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-700 p-6">
          <h1 className="text-2xl font-black text-white mb-2">Qual é seu objetivo?</h1>
          <p className="text-gray-400">Escolha o caminho que melhor descreve você. Cada um tem uma jornada customizada.</p>
        </div>

        {/* Personas Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {personas.map((persona) => (
            <button
              key={persona.id}
              onClick={() => handleSelect(persona.id)}
              className={`text-left rounded-lg border-2 transition-all duration-300 p-6 ${
                selected === persona.id
                  ? `border-white bg-gradient-to-br ${persona.color}`
                  : 'border-neutral-700 bg-neutral-800 hover:border-neutral-600'
              }`}
            >
              {/* Icon and Title */}
              <div className="flex items-start justify-between mb-3">
                <div className={`${selected === persona.id ? 'text-white' : 'text-gray-400'}`}>
                  {persona.icon}
                </div>
                {selected === persona.id && (
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-600 to-pink-600" />
                  </div>
                )}
              </div>

              <h3 className={`text-lg font-black mb-1 ${selected === persona.id ? 'text-white' : 'text-white'}`}>
                {persona.title}
              </h3>
              <p className={`text-sm mb-4 ${selected === persona.id ? 'text-white/90' : 'text-gray-400'}`}>
                {persona.description}
              </p>

              {/* Benefits */}
              <div className={`space-y-2 mb-4 ${selected === persona.id ? 'text-white/90' : 'text-gray-400'}`}>
                {persona.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <span className="mt-1">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className={`text-xs font-mono ${selected === persona.id ? 'text-white/80' : 'text-gray-500'}`}>
                Tempo estimado: {persona.timeline}
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-neutral-900 border-t border-neutral-700 p-6 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Você pode mudar sua escolha a qualquer momento nas configurações
          </p>
          {selected && (
            <button
              onClick={() => handleSelect(selected)}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-sm rounded hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
            >
              Continuar
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonaSelector;
