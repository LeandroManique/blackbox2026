import React, { useState } from 'react';
import { Download, Copy, Share2, Check } from 'lucide-react';
import { CardData } from '../types';

interface ExportStrategyProps {
  card: CardData;
  responses: string[];
  finalStrategy: string;
  onClose: () => void;
}

const ExportStrategy: React.FC<ExportStrategyProps> = ({ card, responses, finalStrategy, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    const text = `${card.techniqueTitle}\n\n${finalStrategy}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    // Simulated PDF download - in production, use a library like jsPDF
    const content = `
BLACK BOX OS - ESTRATÉGIA EXPORTADA
=====================================

Protocolo: ${card.techniqueTitle}
Data: ${new Date().toLocaleDateString('pt-BR')}

ESTRATÉGIA GERADA:
${finalStrategy}

PRÓXIMOS PASSOS:
1. Releia esta estratégia 3 vezes
2. Anote os pontos principais
3. Comece a aplicar hoje mesmo
4. Volte ao BLACK BOX para o próximo protocolo
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `estrategia-${card.id}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = () => {
    const text = `Acabei de completar o protocolo "${card.techniqueTitle}" no BLACK BOX OS! 🚀`;
    if (navigator.share) {
      navigator.share({
        title: 'BLACK BOX OS',
        text: text,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg border border-neutral-700 max-w-md w-full shadow-2xl p-6">
        <h2 className="text-2xl font-black text-white mb-2">Sua Estratégia Está Pronta!</h2>
        <p className="text-gray-400 text-sm mb-6">Escolha como você quer usar:</p>

        {/* Strategy Preview */}
        <div className="bg-neutral-800 rounded p-4 mb-6 border border-neutral-700 max-h-40 overflow-y-auto">
          <p className="text-xs font-mono text-gray-300">{finalStrategy}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Copy Button */}
          <button
            onClick={handleCopyToClipboard}
            className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm rounded transition-all flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar para Colar
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownloadPDF}
            className="w-full px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-sm rounded transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Baixar como Arquivo
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-full px-4 py-3 bg-pink-600 hover:bg-pink-700 text-white font-black text-sm rounded transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-black text-sm rounded transition-all"
          >
            Fechar
          </button>
        </div>

        {/* Tip */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          💡 Dica: Salve esta estratégia em um lugar seguro para consultar depois!
        </p>
      </div>
    </div>
  );
};

export default ExportStrategy;
