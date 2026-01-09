import React from 'react';
import { useGame } from '../context/GameContext';
import { DATA } from '../data/tracks';
import { History, Edit2, Trash2 } from 'lucide-react';

interface ResponseHistoryProps {
  cardId: string;
  onRefine?: () => void;
  onDelete?: () => void;
}

const ResponseHistory: React.FC<ResponseHistoryProps> = ({ cardId, onRefine, onDelete }) => {
  const { getUserResponse } = useGame();
  const response = getUserResponse(cardId);

  if (!response) {
    return (
      <div className="bg-neutral-800 rounded p-4 border border-neutral-700 text-center">
        <p className="text-sm text-gray-400">Nenhuma resposta salva ainda para este protocolo.</p>
      </div>
    );
  }

  const date = new Date(response.timestamp);
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-neutral-800 rounded p-4 border border-neutral-700">
      <div className="flex items-center gap-2 mb-3">
        <History className="w-4 h-4 text-gray-400" />
        <h4 className="text-sm font-black text-white">Histórico de Respostas</h4>
      </div>

      <div className="text-xs text-gray-400 mb-3">
        Última atualização: {formattedDate}
      </div>

      {/* Respostas */}
      <div className="space-y-2 mb-4">
        {response.responses.map((resp, idx) => (
          <div key={idx} className="bg-neutral-900 rounded p-3 border border-neutral-700">
            <p className="text-xs text-gray-500 mb-1">Resposta {idx + 1}:</p>
            <p className="text-sm text-gray-300">{resp}</p>
          </div>
        ))}
      </div>

      {/* Estratégia Final */}
      {response.finalStrategy && (
        <div className="bg-neutral-900 rounded p-3 border border-neutral-700 mb-4">
          <p className="text-xs text-gray-500 mb-1">Estratégia Gerada:</p>
          <p className="text-sm text-gray-300">{response.finalStrategy}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {onRefine && (
          <button
            onClick={onRefine}
            className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded transition-all flex items-center justify-center gap-1"
          >
            <Edit2 className="w-3 h-3" />
            Refinar
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded transition-all flex items-center justify-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            Deletar
          </button>
        )}
      </div>
    </div>
  );
};

export default ResponseHistory;
