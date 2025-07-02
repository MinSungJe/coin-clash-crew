import { useState, useEffect } from 'react';
import { CoinData, Portfolio, Trade, INITIAL_COINS, createInitialPortfolio } from '@/types/GameTypes';

export const useGameLogic = (selectedDuration: number, initialCapital: number) => {
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting');
  const [timeLeft, setTimeLeft] = useState(selectedDuration);
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [portfolio, setPortfolio] = useState<Portfolio>(createInitialPortfolio(initialCapital));
  const [coins, setCoins] = useState<CoinData[]>(INITIAL_COINS);
  const [isGaveUp, setIsGaveUp] = useState(false);

  // Update portfolio when initialCapital changes
  useEffect(() => {
    setPortfolio(createInitialPortfolio(initialCapital));
  }, [initialCapital]);

  // Mock real-time price updates
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setCoins(prevCoins => 
        prevCoins.map(coin => {
          const changePercent = (Math.random() - 0.5) * 0.1; // ±5% max change
          const newPrice = coin.price * (1 + changePercent);
          const newDataPoint = {
            time: Date.now(),
            price: newPrice
          };
          
          return {
            ...coin,
            price: newPrice,
            change: changePercent * 100,
            chartData: [...coin.chartData.slice(-19), newDataPoint] // Keep last 20 points
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [gameState]);

  // Game timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(selectedDuration);
    setPortfolio(createInitialPortfolio(initialCapital));
    setIsGaveUp(false);
    // Initialize chart data
    const now = Date.now();
    setCoins(prevCoins =>
      prevCoins.map(coin => ({
        ...coin,
        chartData: [{ time: now, price: coin.price }]
      }))
    );
  };

  const endGame = () => {
    setGameState('finished');
    setIsGaveUp(true);
  };

  const resetGame = () => {
    setGameState('waiting');
    setTimeLeft(selectedDuration);
    setPortfolio(createInitialPortfolio(initialCapital));
    setIsGaveUp(false);
    setCoins(prevCoins =>
      prevCoins.map(coin => ({
        ...coin,
        change: 0,
        chartData: []
      }))
    );
  };

  const calculateTotalValue = () => {
    const holdingsValue = Object.entries(portfolio.holdings).reduce((total, [symbol, amount]) => {
      const coin = coins.find(c => c.symbol === symbol);
      return total + (coin ? coin.price * amount : 0);
    }, 0);
    return portfolio.cash + holdingsValue;
  };

  const handleTrade = (trade: Omit<Trade, 'price' | 'timestamp'>) => {
    setPortfolio(prev => {
      const coin = coins.find(c => c.symbol === trade.symbol)!;
      const tradeValue = trade.amount * coin.price;
      
      if (trade.type === 'buy') {
        if (prev.cash < tradeValue) return prev; // Not enough cash
        
        return {
          ...prev,
          cash: prev.cash - tradeValue,
          holdings: {
            ...prev.holdings,
            [trade.symbol]: prev.holdings[trade.symbol] + trade.amount
          },
          trades: [...prev.trades, { ...trade, price: coin.price, timestamp: Date.now() }]
        };
      } else {
        if (prev.holdings[trade.symbol] < trade.amount) return prev; // Not enough holdings
        
        return {
          ...prev,
          cash: prev.cash + tradeValue,
          holdings: {
            ...prev.holdings,
            [trade.symbol]: prev.holdings[trade.symbol] - trade.amount
          },
          trades: [...prev.trades, { ...trade, price: coin.price, timestamp: Date.now() }]
        };
      }
    });
  };

  return {
    gameState,
    timeLeft,
    selectedCoin,
    setSelectedCoin,
    portfolio,
    coins,
    startGame,
    resetGame,
    calculateTotalValue,
    handleTrade,
    endGame,
    isGaveUp
  };
};
