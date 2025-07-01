
import React, { useState } from 'react';
import WaitingScreen from '@/components/WaitingScreen';
import GameHeader from '@/components/GameHeader';
import CryptoChart from '@/components/CryptoChart';
import TradingPanel from '@/components/TradingPanel';
import Portfolio from '@/components/Portfolio';
import GameResults from '@/components/GameResults';
import { useGameLogic } from '@/hooks/useGameLogic';

const Index = () => {
  const [selectedDuration, setSelectedDuration] = useState(120); // Default 2 minutes
  
  const {
    gameState,
    timeLeft,
    selectedCoin,
    setSelectedCoin,
    portfolio,
    coins,
    startGame,
    resetGame,
    calculateTotalValue,
    handleTrade
  } = useGameLogic(selectedDuration);

  const profitLoss = calculateTotalValue() - 10000;
  const profitLossPercent = (profitLoss / 10000) * 100;
  
  const currentPrices = coins.reduce((acc, coin) => {
    acc[coin.symbol] = coin.price;
    return acc;
  }, {} as { [key: string]: number });

  if (gameState === 'waiting') {
    return (
      <WaitingScreen
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        onStartGame={startGame}
      />
    );
  }

  if (gameState === 'finished') {
    return (
      <GameResults 
        finalValue={calculateTotalValue()}
        profitLoss={profitLoss}
        profitLossPercent={profitLossPercent}
        trades={portfolio.trades}
        onRestart={resetGame}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <GameHeader timeLeft={timeLeft} />

        {/* Portfolio Overview */}
        <Portfolio 
          portfolio={portfolio}
          totalValue={calculateTotalValue()}
          profitLoss={profitLoss}
          profitLossPercent={profitLossPercent}
          currentPrices={currentPrices}
        />

        {/* Main Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <CryptoChart 
              coins={coins}
              selectedCoin={selectedCoin}
              onCoinSelect={setSelectedCoin}
            />
          </div>

          {/* Trading Panel */}
          <div>
            <TradingPanel 
              selectedCoin={coins.find(c => c.symbol === selectedCoin)!}
              portfolio={portfolio}
              onTrade={handleTrade}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
