import React, { useState, useEffect } from 'react';
import { User, LogOut, Menu, X } from 'lucide-react';
import { authService } from '../services/authService';
import { emailService } from '../services/emailService';
import TrackGrid from '../components/TrackGrid';
import PersonaSelectorModal from '../components/PersonaSelectorModal';
import ProgressBar from '../components/ProgressBar';
import MetricsDashboard from '../components/MetricsDashboard';
import StrategiesDashboard from '../components/StrategiesDashboard';

interface MainAppProps {
  user: any;
  onLogout: () => void;
}

type View = 'home' | 'metrics' | 'strategies';

const MainApp: React.FC<MainAppProps> = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);
  const [persona, setPersona] = useState<'ugc' | 'influencer' | 'viral' | 'seller' | null>(null);
  const [isLoadingPersona, setIsLoadingPersona] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Verificar se usuário tem persona selecionada
    const checkPersona = async () => {
      const userProfile = await authService.getUserProfile(user.uid);
      if (userProfile?.persona) {
        setPersona(userProfile.persona);
      } else {
        setShowPersonaSelector(true);
      }
    };

    checkPersona();
  }, [user.uid]);

  const handlePersonaSelect = async (selectedPersona: 'ugc' | 'influencer' | 'viral' | 'seller') => {
    setIsLoadingPersona(true);
    try {
      // Salvar persona no Firebase
      await authService.updateUserProfile(user.uid, {
        persona: selectedPersona,
      });

      // Enviar email de boas-vindas
      await emailService.sendWelcomeEmail(user.email, user.displayName || 'Aluno');

      setPersona(selectedPersona);
      setShowPersonaSelector(false);
    } catch (error) {
      console.error('Erro ao selecionar persona:', error);
    } finally {
      setIsLoadingPersona(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      onLogout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">BB</span>
            </div>
            <h1 className="text-xl font-black text-white hidden sm:block">BLACK BOX OS</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setCurrentView('home')}
              className={`text-sm font-bold transition-colors ${
                currentView === 'home' ? 'text-purple-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Protocolos
            </button>
            <button
              onClick={() => setCurrentView('metrics')}
              className={`text-sm font-bold transition-colors ${
                currentView === 'metrics' ? 'text-purple-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Métricas
            </button>
            <button
              onClick={() => setCurrentView('strategies')}
              className={`text-sm font-bold transition-colors ${
                currentView === 'strategies' ? 'text-purple-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Estratégias
            </button>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-neutral-800 rounded-lg">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-white font-bold">{user.displayName || user.email}</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-neutral-800 rounded transition-colors"
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-neutral-800 p-4 space-y-2">
            <button
              onClick={() => {
                setCurrentView('home');
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-neutral-800 rounded transition-colors text-white font-bold"
            >
              Protocolos
            </button>
            <button
              onClick={() => {
                setCurrentView('metrics');
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-neutral-800 rounded transition-colors text-white font-bold"
            >
              Métricas
            </button>
            <button
              onClick={() => {
                setCurrentView('strategies');
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-neutral-800 rounded transition-colors text-white font-bold"
            >
              Estratégias
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <ProgressBar />

        {/* Views */}
        {currentView === 'home' && persona && <TrackGrid persona={persona} />}
        {currentView === 'metrics' && <MetricsDashboard />}
        {currentView === 'strategies' && <StrategiesDashboard />}
      </main>

      {/* Persona Selector Modal */}
      {showPersonaSelector && (
        <PersonaSelectorModal onSelect={handlePersonaSelect} isLoading={isLoadingPersona} />
      )}
    </div>
  );
};

export default MainApp;
