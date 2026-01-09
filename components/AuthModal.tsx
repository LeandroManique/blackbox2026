import React, { useState } from 'react';
import { Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';

interface AuthModalProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (email: string, password: string, displayName: string) => Promise<void>;
  isLoading?: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ onLogin, onRegister, isLoading = false }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await onLogin(email, password);
      } else {
        if (!displayName.trim()) {
          setError('Por favor, digite seu nome');
          return;
        }
        await onRegister(email, password, displayName);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao processar requisição');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg border border-neutral-700 max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
          <h1 className="text-2xl font-black text-white">BLACK BOX OS</h1>
          <p className="text-white/80 text-sm">Transforme sua vida com estratégia</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">Email</label>
            <div className="flex items-center gap-2 px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus-within:border-purple-500">
              <Mail className="w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Display Name (Register only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-white mb-2">Nome</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus-within:border-purple-500">
                <User className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Seu nome"
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">Senha</label>
            <div className="flex items-center gap-2 px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus-within:border-purple-500">
              <Lock className="w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-700/50 rounded text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Carregando...
              </>
            ) : isLogin ? (
              <>
                <LogIn className="w-4 h-4" />
                Entrar
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Registrar
              </>
            )}
          </button>

          {/* Toggle */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              {isLogin ? 'Não tem conta? Registre-se' : 'Já tem conta? Faça login'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-700 text-xs text-gray-500 text-center">
          Seus dados são protegidos e nunca serão compartilhados
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
