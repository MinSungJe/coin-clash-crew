
import { useState, useEffect, useCallback } from 'react';
import { GameRecord } from '@/types/GameTypes';

const GAME_HISTORY_KEY = 'crypto-game-history';

export const useGameHistory = () => {
  const [gameHistory, setGameHistory] = useState<GameRecord[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(GAME_HISTORY_KEY);
    if (savedHistory) {
      try {
        setGameHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to load game history:', error);
        setGameHistory([]);
      }
    }
  }, []);

  const saveGameRecord = useCallback((record: Omit<GameRecord, 'id'>) => {
    const newRecord: GameRecord = {
      ...record,
      id: `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    setGameHistory(prevHistory => {
      // 중복 방지: 같은 timestamp의 기록이 이미 있는지 확인
      const isDuplicate = prevHistory.some(existing => 
        Math.abs(existing.timestamp - newRecord.timestamp) < 1000 // 1초 이내 같은 기록 방지
      );
      
      if (isDuplicate) {
        console.log('Duplicate game record prevented');
        return prevHistory;
      }
      
      const updatedHistory = [newRecord, ...prevHistory].slice(0, 50); // Keep last 50 games
      localStorage.setItem(GAME_HISTORY_KEY, JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setGameHistory([]);
    localStorage.removeItem(GAME_HISTORY_KEY);
  }, []);

  const getStatistics = useCallback(() => {
    if (gameHistory.length === 0) {
      return {
        totalGames: 0,
        winRate: 0,
        averageReturn: 0,
        bestReturn: 0,
        worstReturn: 0,
        totalTrades: 0,
        averageTradesPerGame: 0
      };
    }

    const wins = gameHistory.filter(game => game.profitLoss > 0).length;
    const returns = gameHistory.map(game => game.profitLossPercent);
    const totalTrades = gameHistory.reduce((sum, game) => sum + game.trades.length, 0);

    return {
      totalGames: gameHistory.length,
      winRate: (wins / gameHistory.length) * 100,
      averageReturn: returns.reduce((sum, ret) => sum + ret, 0) / returns.length,
      bestReturn: Math.max(...returns),
      worstReturn: Math.min(...returns),
      totalTrades,
      averageTradesPerGame: totalTrades / gameHistory.length
    };
  }, [gameHistory]);

  return {
    gameHistory,
    saveGameRecord,
    clearHistory,
    getStatistics
  };
};
