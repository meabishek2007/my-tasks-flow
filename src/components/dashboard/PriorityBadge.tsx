import { Priority } from '@/types/task';
import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const baseClasses = 'px-2.5 py-1 text-xs font-medium rounded-full border uppercase tracking-wide';

  const priorityClasses: Record<Priority, string> = {
    low: 'bg-success/20 text-[hsl(142,76%,50%)] border-success/30',
    medium: 'bg-warning/20 text-warning border-warning/30',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    emergency: 'bg-emergency/20 text-emergency border-emergency/30 animate-pulse-glow',
  };

  return (
    <span className={cn(baseClasses, priorityClasses[priority], className)}>
      {priority === 'emergency' && '🚨 '}
      {priority}
    </span>
  );
}
