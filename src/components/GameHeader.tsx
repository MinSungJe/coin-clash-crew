
import React from 'react';
import { TrendingUp } from 'lucide-react';
import GameTimer from '@/components/GameTimer';

interface GameHeaderProps {
  timeLeft: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({ timeLeft }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-green-400" />
        코인 배틀
      </h1>
      <GameTimer timeLeft={timeLeft} />
    </div>
  );
};

export default GameHeader;
