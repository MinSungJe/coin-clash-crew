
import React from 'react';
import { TrendingUp, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameTimer from '@/components/GameTimer';

interface GameHeaderProps {
  timeLeft: number;
  onGiveUp: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ timeLeft, onGiveUp }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-green-400" />
        코인 배틀
      </h1>
      
      <div className="flex items-center gap-4">
        <Button
          onClick={onGiveUp}
          variant="outline"
          className="bg-red-500/20 border-red-400/40 text-red-300 hover:bg-red-500/30 hover:text-red-200"
        >
          <Flag className="w-4 h-4 mr-2" />
          기권하기
        </Button>
        <GameTimer timeLeft={timeLeft} />
      </div>
    </div>
  );
};

export default GameHeader;
