import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { GameContextType, UserResponse } from '../types';
import { DATA } from '../data/tracks';

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEY = 'growth_os_v1_save';
const RESPONSES_KEY = 'growth_os_v1_responses';

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [unlockedCards, setUnlockedCards] = useState<string[]>(['z1']);
  const [completedCards, setCompletedCards] = useState<string[]>([]);
  const [claimedAchievements, setClaimedAchievements] = useState<string[]>([]);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.unlockedCards) setUnlockedCards(parsed.unlockedCards);
        if (parsed.completedCards) setCompletedCards(parsed.completedCards);
        if (parsed.claimedAchievements) setClaimedAchievements(parsed.claimedAchievements);
      } catch (e) {
        console.error('Failed to load save game', e);
      }
    }

    // Load responses
    const savedResponses = localStorage.getItem(RESPONSES_KEY);
    if (savedResponses) {
      try {
        const parsed = JSON.parse(savedResponses);
        setUserResponses(parsed);
      } catch (e) {
        console.error('Failed to load responses', e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
      unlockedCards, 
      completedCards, 
      claimedAchievements 
    }));
  }, [unlockedCards, completedCards, claimedAchievements]);

  // Save responses
  useEffect(() => {
    localStorage.setItem(RESPONSES_KEY, JSON.stringify(userResponses));
  }, [userResponses]);

  const completeCard = (cardId: string) => {
    if (completedCards.includes(cardId)) return;

    const newCompleted = [...completedCards, cardId];
    setCompletedCards(newCompleted);

    let newUnlocked = [...unlockedCards];

    // Find the track and card index
    let currentTrackIndex = -1;
    let currentCardIndex = -1;

    for (let i = 0; i < DATA.length; i++) {
      const cardIdx = DATA[i].cards.findIndex(c => c.id === cardId);
      if (cardIdx !== -1) {
        currentTrackIndex = i;
        currentCardIndex = cardIdx;
        break;
      }
    }

    if (currentTrackIndex !== -1 && currentCardIndex !== -1) {
      const track = DATA[currentTrackIndex];
      
      // Logic 1: Unlock next card in the same track
      if (currentCardIndex + 1 < track.cards.length) {
        const nextCardId = track.cards[currentCardIndex + 1].id;
        if (!newUnlocked.includes(nextCardId)) {
          newUnlocked.push(nextCardId);
        }
      }

      // Logic 2: Special rule for Setup completion (card 'z4')
      if (cardId === 'z4') {
        const specialUnlocks = ['i1', 'a1', 's1'];
        specialUnlocks.forEach(id => {
          if (!newUnlocked.includes(id)) {
            newUnlocked.push(id);
          }
        });
      }
    }

    setUnlockedCards(newUnlocked);
  };

  const claimAchievement = (trackId: string) => {
    if (!claimedAchievements.includes(trackId)) {
      setClaimedAchievements([...claimedAchievements, trackId]);
    }
  };

  const saveUserResponse = (cardId: string, responses: string[], finalStrategy?: string) => {
    const existingIndex = userResponses.findIndex(r => r.cardId === cardId);
    const newResponse: UserResponse = {
      cardId,
      timestamp: Date.now(),
      responses,
      finalStrategy
    };

    if (existingIndex >= 0) {
      const updated = [...userResponses];
      updated[existingIndex] = newResponse;
      setUserResponses(updated);
    } else {
      setUserResponses([...userResponses, newResponse]);
    }
  };

  const getUserResponse = (cardId: string): UserResponse | undefined => {
    return userResponses.find(r => r.cardId === cardId);
  };

  const isCardUnlocked = (cardId: string) => unlockedCards.includes(cardId);
  const isCardCompleted = (cardId: string) => completedCards.includes(cardId);

  return (
    <GameContext.Provider value={{ 
      unlockedCards, 
      completedCards, 
      completeCard, 
      isCardUnlocked, 
      isCardCompleted,
      claimedAchievements,
      claimAchievement,
      userResponses,
      saveUserResponse,
      getUserResponse
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
