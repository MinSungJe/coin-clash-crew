
import React, { useState } from 'react';
import WaitingScreen from '@/components/WaitingScreen';
import CountdownScreen from '@/components/CountdownScreen';
import GameHeader from '@/components/GameHeader';
import CryptoChart from '@/components/CryptoChart';
import TradingPanel from '@/components/TradingPanel';
import Portfolio from '@/components/Portfolio';
import GameResults from '@/components/GameResults';
import { useGameLogic } from '@/hooks/useGameLogic';

const Index = () => {
  const [selectedDuration, setSelectedDuration] = useState(120); // Default 2 minutes
  const [selectedCapital, setSelectedCapital] = useState(10000); // Default 10,000원
  
  const {
    gameState,
    countdown,
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
  } = useGameLogic(selectedDuration, selectedCapital);

  const profitLoss = calculateTotalValue() - selectedCapital;
  const profitLossPercent = (profitLoss / selectedCapital) * 100;
  
  const currentPrices = coins.reduce((acc, coin) => {
    acc[coin.symbol] = coin.price;
    return acc;
  }, {} as { [key: string]: number });

  const handleGiveUp = () => {
    endGame();
  };

  if (gameState === 'waiting') {
    return (
      <WaitingScreen
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        selectedCapital={selectedCapital}
        onCapitalChange={setSelectedCapital}
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
        isGaveUp={isGaveUp}
        selectedDuration={selectedDuration}
        selectedCapital={selectedCapital}
      />
    );
  }

  // Show game screen for both countdown and playing states
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4">
      {/* Countdown Overlay */}
      {gameState === 'countdown' && <CountdownScreen countdown={countdown} />}
      
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <GameHeader timeLeft={timeLeft} onGiveUp={handleGiveUp} />

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
