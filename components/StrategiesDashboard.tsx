import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { DATA } from '../data/tracks';
import { BookOpen, Copy, Download, X } from 'lucide-react';

const StrategiesDashboard: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { userResponses } = useGame();
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const getCardTitle = (cardId: string) => {
    for (const track of DATA) {
      const card = track.cards.find(c => c.id === cardId);
      if (card) return card.cardTitle;
    }
    return 'Desconhecido';
  };

  const handleCopy = (strategy: string) => {
    navigator.clipboard.writeText(strategy);
    setCopied(strategy);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownloadAll = () => {
    const allStrategies = userResponses
      .map(r => `${getCardTitle(r.cardId)}\n${r.finalStrategy || 'Sem estratégia'}\n---`)
      .join('\n\n');

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(allStrategies));
    element.setAttribute('download', 'minhas-estrategias.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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
              <BookOpen className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-black text-white">Minhas Estratégias</h2>
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
            {userResponses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Você ainda não completou nenhum protocolo.</p>
                <p className="text-sm text-gray-500">Complete protocolos para ver suas estratégias aqui!</p>
              </div>
            ) : (
              <>
                {/* Download All Button */}
                <button
                  onClick={handleDownloadAll}
                  className="w-full mb-6 px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-sm rounded transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Baixar Todas as Estratégias
                </button>

                {/* Strategies List */}
                <div className="space-y-4">
                  {userResponses.map((response, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-800 rounded p-4 border border-neutral-700"
                    >
                      <h3 className="text-sm font-black text-white mb-2">
                        {getCardTitle(response.cardId)}
                      </h3>

                      <div className="bg-neutral-900 rounded p-3 mb-3 max-h-32 overflow-y-auto">
                        <p className="text-xs text-gray-300">
                          {response.finalStrategy || 'Sem estratégia gerada'}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopy(response.finalStrategy || '')}
                          className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded transition-all flex items-center justify-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          {copied === response.finalStrategy ? 'Copiado!' : 'Copiar'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-6 pt-4 border-t border-neutral-700">
                  <p className="text-xs text-gray-400 text-center">
                    Você completou {userResponses.length} protocolo(s). Continue para desbloquear mais!
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StrategiesDashboard;
