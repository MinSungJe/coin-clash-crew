
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface GameTimerProps {
  timeLeft: number;
}

const GameTimer: React.FC<GameTimerProps> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const isUrgent = timeLeft <= 60;
  
  return (
    <Card className={`p-4 bg-white/10 backdrop-blur-lg border-white/20 ${isUrgent ? 'animate-pulse' : ''}`}>
      <div className="flex items-center gap-2">
        <Clock className={`w-5 h-5 ${isUrgent ? 'text-red-400' : 'text-blue-400'}`} />
        <span className={`text-lg font-mono font-bold ${isUrgent ? 'text-red-400' : 'text-white'}`}>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
    </Card>
  );
};

export default GameTimer;
