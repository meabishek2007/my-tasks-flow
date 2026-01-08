import { PerformanceStats } from '@/types/task';
import { Trophy, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PerformanceWidgetProps {
  stats: PerformanceStats;
}

export function PerformanceWidget({ stats }: PerformanceWidgetProps) {
  const completionRate = Math.round((stats.completedTasks / stats.totalTasks) * 100);
  const onTimeRate = stats.completedTasks > 0
    ? Math.round((stats.onTimeCompletions / stats.completedTasks) * 100)
    : 0;

  return (
    <div className="glass-card p-5 animate-fade-in">
      <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-primary" />
        My Performance
      </h2>

      {/* Score Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-secondary"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(stats.score / 100) * 352} 352`}
              strokeLinecap="round"
              className="text-primary transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{stats.score}</span>
            <span className="text-xs text-muted-foreground">Score</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-success" />
            <span>Completed</span>
          </div>
          <span className="font-medium text-foreground">
            {stats.completedTasks}/{stats.totalTasks}
          </span>
        </div>
        <Progress value={completionRate} className="h-2" />

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-warning" />
            <span>On Time</span>
          </div>
          <span className="font-medium text-foreground">{stats.onTimeCompletions}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 text-emergency" />
            <span>Late</span>
          </div>
          <span className="font-medium text-foreground">{stats.lateCompletions}</span>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">On-Time Rate</span>
            <span className="font-medium text-success">{onTimeRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
