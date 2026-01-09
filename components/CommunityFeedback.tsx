import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

interface FeedbackItem {
  id: string;
  author: string;
  message: string;
  timestamp: number;
  likes: number;
}

interface CommunityFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommunityFeedback: React.FC<CommunityFeedbackProps> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([
    {
      id: '1',
      author: 'Criador #1',
      message: 'O BLACK BOX OS mudou meu jeito de pensar sobre estratégia. Recomendo!',
      timestamp: Date.now() - 86400000,
      likes: 45
    },
    {
      id: '2',
      author: 'Criador #2',
      message: 'Arthur é insano. As perguntas dele forçam você a pensar diferente.',
      timestamp: Date.now() - 172800000,
      likes: 32
    },
    {
      id: '3',
      author: 'Criador #3',
      message: 'Já apliquei 3 estratégias e meu engajamento subiu 200%!',
      timestamp: Date.now() - 259200000,
      likes: 78
    }
  ]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (feedback.trim()) {
      setFeedbackList([
        {
          id: Date.now().toString(),
          author: 'Você',
          message: feedback,
          timestamp: Date.now(),
          likes: 0
        },
        ...feedbackList
      ]);
      setFeedback('');
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg border border-neutral-700 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-neutral-900 border-b border-neutral-700 p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-pink-500" />
              <h2 className="text-lg font-black text-white">Comunidade</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-neutral-700 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Input */}
            <div className="space-y-2">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Compartilhe sua experiência ou dúvida..."
                className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                rows={3}
              />
              <button
                onClick={handleSubmit}
                disabled={!feedback.trim()}
                className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm rounded transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar
              </button>
            </div>

            {/* Feedback List */}
            <div className="border-t border-neutral-700 pt-4 space-y-3">
              {feedbackList.map((item) => (
                <div key={item.id} className="bg-neutral-800 rounded p-3 border border-neutral-700">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-black text-white">{item.author}</p>
                    <span className="text-xs text-gray-500">
                      {Math.floor((Date.now() - item.timestamp) / 86400000)}d atrás
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">{item.message}</p>
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-gray-500 hover:text-pink-500 transition-colors">
                      ❤️ {item.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityFeedback;
