import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return (
      <div className="fixed bottom-4 right-4 flex items-center gap-2 px-3 py-2 bg-green-900/30 border border-green-700/50 rounded text-xs font-mono text-green-400">
        <Wifi className="w-3 h-3" />
        Online
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 px-3 py-2 bg-red-900/30 border border-red-700/50 rounded text-xs font-mono text-red-400 animate-pulse">
      <WifiOff className="w-3 h-3" />
      Modo Offline - Dados salvos localmente
    </div>
  );
};

export default OfflineIndicator;
