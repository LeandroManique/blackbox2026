import React, { useState } from 'react';
import { Zap, X } from 'lucide-react';

interface FastModeProps {
  isOpen: boolean;
  onClose: () => void;
  onEnable: () => void;
}

const FastMode: React.FC<FastModeProps> = ({ isOpen, onClose, onEnable }) => {
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg border border-neutral-700 max-w-md w-full shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-700">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-black text-white">Modo Rápido</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-neutral-700 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-sm text-gray-300 mb-4">
              O Modo Rápido pula perguntas óbvias e vai direto ao ponto. Ideal se você já sabe o que quer.
            </p>

            <div className="bg-neutral-800 rounded p-4 border border-neutral-700 mb-6">
              <p className="text-xs font-mono text-gray-400 mb-2">O que muda:</p>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>✓ Menos perguntas de contexto</li>
                <li>✓ Direto para o refinamento</li>
                <li>✓ Estratégia gerada mais rápido</li>
                <li>✓ Ideal para usuários experientes</li>
              </ul>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <input
                type="checkbox"
                id="confirm"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="confirm" className="text-xs text-gray-400">
                Entendo que vou pular algumas perguntas
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white font-black text-sm rounded transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (confirmed) {
                    onEnable();
                    onClose();
                  }
                }}
                disabled={!confirmed}
                className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm rounded transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Ativar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FastMode;
