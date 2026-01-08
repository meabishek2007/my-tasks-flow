import { useCountdown } from '@/hooks/useCountdown';
import { Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  deadline: Date;
  className?: string;
}

export function CountdownTimer({ deadline, className }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isOverdue, isUrgent } = useCountdown(deadline);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div
      className={cn(
        'flex items-center gap-2 text-sm',
        isOverdue && 'text-emergency',
        isUrgent && !isOverdue && 'text-warning',
        !isOverdue && !isUrgent && 'text-muted-foreground',
        className
      )}
    >
      {isOverdue ? (
        <AlertTriangle className="h-4 w-4" />
      ) : (
        <Clock className="h-4 w-4" />
      )}
      <div className="font-mono">
        {isOverdue && <span className="mr-1">-</span>}
        {days > 0 && <span>{days}d </span>}
        <span>{formatNumber(hours)}:</span>
        <span>{formatNumber(minutes)}:</span>
        <span>{formatNumber(seconds)}</span>
      </div>
      {isOverdue && <span className="text-xs">(Overdue)</span>}
      {isUrgent && !isOverdue && <span className="text-xs">(Urgent)</span>}
    </div>
  );
}
