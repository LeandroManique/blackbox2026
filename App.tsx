import React, { useState, useEffect } from 'react';
import { authService } from './services/authService';
import { GameProvider } from './context/GameContext';
import AuthModal from './components/AuthModal';
import MainApp from './pages/MainApp';

function App() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se usuário está logado
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await authService.login(email, password);
      setUser(user);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string, displayName: string) => {
    setIsLoading(true);
    try {
      const user = await authService.register(email, password, displayName);
      setUser(user);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Loading state
  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white font-bold">Carregando...</p>
        </div>
      </div>
    );
  }

  // Auth Modal
  if (!user) {
    return <AuthModal onLogin={handleLogin} onRegister={handleRegister} isLoading={isLoading} />;
  }

  // Main App com GameProvider
  return (
    <GameProvider>
      <MainApp user={user} onLogout={handleLogout} />
    </GameProvider>
  );
}

export default App;
