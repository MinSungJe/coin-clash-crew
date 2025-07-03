
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGameHistory } from '@/hooks/useGameHistory';
import { ArrowLeft, TrendingUp, TrendingDown, Target, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const GameHistory = () => {
  const { gameHistory, clearHistory, getStatistics } = useGameHistory();
  const stats = getStatistics();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(price));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds}초`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                게임으로 돌아가기
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">게임 기록</h1>
          </div>
          {gameHistory.length > 0 && (
            <Button
              onClick={clearHistory}
              variant="outline"
              className="bg-red-600/20 border-red-400/40 text-red-300 hover:bg-red-600/30"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              기록 삭제
            </Button>
          )}
        </div>

        {gameHistory.length === 0 ? (
          <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">아직 게임 기록이 없습니다</h2>
            <p className="text-white/70 mb-6">첫 게임을 플레이하고 기록을 쌓아보세요!</p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                게임 시작하기
              </Button>
            </Link>
          </Card>
        ) : (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">총 게임 수</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalGames}게임</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">승률</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">{stats.winRate.toFixed(1)}%</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">평균 수익률</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${stats.averageReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stats.averageReturn >= 0 ? '+' : ''}{stats.averageReturn.toFixed(2)}%
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">최고 수익률</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">
                    +{stats.bestReturn.toFixed(2)}%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Game History Table */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">게임 기록</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-white/70">날짜</TableHead>
                      <TableHead className="text-white/70">시간</TableHead>
                      <TableHead className="text-white/70">초기 자본</TableHead>
                      <TableHead className="text-white/70">최종 자산</TableHead>
                      <TableHead className="text-white/70">손익</TableHead>
                      <TableHead className="text-white/70">수익률</TableHead>
                      <TableHead className="text-white/70">거래 횟수</TableHead>
                      <TableHead className="text-white/70">상태</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gameHistory.map((game) => (
                      <TableRow key={game.id} className="border-white/20">
                        <TableCell className="text-white">{formatDate(game.timestamp)}</TableCell>
                        <TableCell className="text-white">{formatDuration(game.duration)}</TableCell>
                        <TableCell className="text-white">₩{formatPrice(game.initialCapital)}</TableCell>
                        <TableCell className="text-white">₩{formatPrice(game.finalValue)}</TableCell>
                        <TableCell className={game.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}>
                          {game.profitLoss >= 0 ? '+' : ''}₩{formatPrice(game.profitLoss)}
                        </TableCell>
                        <TableCell className={game.profitLossPercent >= 0 ? 'text-green-400' : 'text-red-400'}>
                          <div className="flex items-center gap-1">
                            {game.profitLossPercent >= 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            {game.profitLossPercent >= 0 ? '+' : ''}{game.profitLossPercent.toFixed(2)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-white">{game.trades.length}회</TableCell>
                        <TableCell>
                          {game.isGaveUp ? (
                            <span className="text-orange-400 text-sm">기권</span>
                          ) : (
                            <span className="text-blue-400 text-sm">완주</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default GameHistory;
