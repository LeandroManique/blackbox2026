import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { X, ChevronRight, Play } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  action: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Bem-vindo ao BLACK BOX OS',
    description: 'Este é um sistema completo para você dominar os algoritmos do TikTok e crescer como criador. Você vai fazer 16 protocolos (tarefas) estruturados em 4 etapas.',
    action: 'Continuar'
  },
  {
    id: 'progress',
    title: 'Acompanhe seu progresso',
    description: 'A barra acima mostra quantos protocolos você já completou. Comece com "SEU TEMA" para desbloquear os próximos passos.',
    action: 'Continuar'
  },
  {
    id: 'tracks',
    title: 'As 4 etapas do sistema',
    description: 'O INÍCIO (Setup básico) → O CRIADOR (Como viralizar) → O MESTRE (Como vender) → O VENDEDOR (Produtos físicos). Complete uma para desbloquear a próxima.',
    action: 'Continuar'
  },
  {
    id: 'cards',
    title: 'Clique em um card para começar',
    description: 'Cada card é um protocolo. Quando você clica, Arthur (a IA) faz perguntas para entender sua estratégia. Responda com sinceridade e detalhes.',
    action: 'Continuar'
  },
  {
    id: 'arthur',
    title: 'Conheça Arthur, seu estrategista',
    description: 'Arthur não dá respostas prontas. Ele faz perguntas para você pensar melhor e encontrar a melhor estratégia para seu caso. Ele é direto e não aceita respostas vagas.',
    action: 'Começar agora'
  }
];

interface OnboardingTutorialProps {
  isFirstTime: boolean;
  onComplete: () => void;
}

const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ isFirstTime, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(isFirstTime);
  const { completedCards } = useGame();

  // Auto-hide if user has completed cards
  useEffect(() => {
    if (completedCards.length > 0) {
      setIsVisible(false);
    }
  }, [completedCards]);

  if (!isVisible) return null;

  const step = ONBOARDING_STEPS[currentStep];
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      setIsVisible(false);
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    onComplete();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" />

      {/* Tutorial Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg border border-neutral-700 max-w-md w-full shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-700">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-purple-500" />
              <h2 className="text-lg font-black text-white">GUIA RÁPIDO</h2>
            </div>
            <button
              onClick={handleSkip}
              className="p-1 hover:bg-neutral-700 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Step Indicator */}
            <div className="flex gap-1 mb-6">
              {ONBOARDING_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    idx <= currentStep ? 'bg-purple-600' : 'bg-neutral-700'
                  }`}
                />
              ))}
            </div>

            {/* Step Content */}
            <div className="mb-6">
              <h3 className="text-xl font-black text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Step Counter */}
            <div className="text-xs font-mono text-gray-500 mb-6">
              Passo {currentStep + 1} de {ONBOARDING_STEPS.length}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleSkip}
                className="flex-1 px-4 py-2 text-sm font-mono text-gray-400 hover:text-gray-300 transition-colors"
              >
                Pular
              </button>
              <button
                onClick={handleNext}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-sm rounded hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
              >
                {step.action}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingTutorial;
