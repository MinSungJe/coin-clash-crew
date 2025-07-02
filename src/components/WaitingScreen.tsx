import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TrendingUp, Users, Trophy, Coffee, Clock, DollarSign, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TIME_OPTIONS, INITIAL_CAPITAL_OPTIONS } from '@/types/GameTypes';

interface WaitingScreenProps {
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
  selectedCapital: number;
  onCapitalChange: (capital: number) => void;
  onStartGame: () => void;
}

const WaitingScreen: React.FC<WaitingScreenProps> = ({
  selectedDuration,
  onDurationChange,
  selectedCapital,
  onCapitalChange,
  onStartGame
}) => {
  const [customCapital, setCustomCapital] = useState<string>('');
  const [selectedCapitalOption, setSelectedCapitalOption] = useState<number>(
    INITIAL_CAPITAL_OPTIONS.find(opt => opt.value === selectedCapital)?.value || 10000
  );

  const handleCapitalOptionChange = (value: string) => {
    const numValue = parseInt(value);
    setSelectedCapitalOption(numValue);
    
    if (numValue === 0) {
      // 직접 입력 모드
      const customValue = parseInt(customCapital) || 10000;
      onCapitalChange(customValue);
    } else {
      onCapitalChange(numValue);
    }
  };

  const handleCustomCapitalChange = (value: string) => {
    setCustomCapital(value);
    if (selectedCapitalOption === 0) {
      const numValue = parseInt(value) || 10000;
      onCapitalChange(numValue);
    }
  };

  const formatCapital = (capital: number) => {
    return new Intl.NumberFormat('ko-KR').format(capital);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center bg-white/10 backdrop-blur-lg border-white/20">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">코인 배틀</h1>
            <p className="text-blue-200">친구들과 투자 승부!</p>
          </div>

          {/* Tutorial Button */}
          <Link to="/tutorial">
            <Button 
              variant="outline" 
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 mb-4"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              게임 방법 알아보기
            </Button>
          </Link>

          {/* Initial Capital Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-white">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold">초기 자본 선택</span>
            </div>
            
            <RadioGroup 
              value={selectedCapitalOption.toString()} 
              onValueChange={handleCapitalOptionChange}
              className="grid grid-cols-2 gap-3"
            >
              {INITIAL_CAPITAL_OPTIONS.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={option.value.toString()} 
                    id={`capital-${option.value}`}
                    className="border-white/40 text-white data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <label 
                    htmlFor={`capital-${option.value}`} 
                    className="text-sm text-blue-100 cursor-pointer flex flex-col"
                  >
                    <span className="font-medium text-white">{option.label}</span>
                    <span className="text-xs text-blue-300">{option.description}</span>
                  </label>
                </div>
              ))}
            </RadioGroup>

            {/* Custom Capital Input */}
            {selectedCapitalOption === 0 && (
              <div className="space-y-2">
                <label className="text-white text-sm">초기 자본 입력 (원)</label>
                <Input
                  type="number"
                  value={customCapital}
                  onChange={(e) => handleCustomCapitalChange(e.target.value)}
                  placeholder="10000"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  min="1000"
                  step="1000"
                />
              </div>
            )}
          </div>

          {/* Time Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-white">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">게임 시간 선택</span>
            </div>
            
            <RadioGroup 
              value={selectedDuration.toString()} 
              onValueChange={(value) => onDurationChange(parseInt(value))}
              className="grid grid-cols-2 gap-3"
            >
              {TIME_OPTIONS.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={option.value.toString()} 
                    id={option.value.toString()}
                    className="border-white/40 text-white data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label 
                    htmlFor={option.value.toString()} 
                    className="text-sm text-blue-100 cursor-pointer flex flex-col"
                  >
                    <span className="font-medium text-white">{option.label}</span>
                    <span className="text-xs text-blue-300">{option.description}</span>
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4 text-left text-sm text-blue-100">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              <span>초기 자본: {formatCapital(selectedCapital)}원</span>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className="w-4 h-4" />
              <span>최고 수익률 승리</span>
            </div>
            <div className="flex items-center gap-3">
              <Coffee className="w-4 h-4" />
              <span>꼴등은 커피 쏘기!</span>
            </div>
          </div>

          <Button 
            onClick={onStartGame}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 text-lg"
          >
            {TIME_OPTIONS.find(opt => opt.value === selectedDuration)?.label} 게임 시작하기
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WaitingScreen;
