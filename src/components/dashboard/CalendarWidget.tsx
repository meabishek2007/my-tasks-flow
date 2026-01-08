import { Task } from '@/types/task';
import { Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, isToday, isTomorrow, addDays, startOfDay } from 'date-fns';

interface CalendarWidgetProps {
  tasks: Task[];
}

export function CalendarWidget({ tasks }: CalendarWidgetProps) {
  const today = startOfDay(new Date());
  const upcomingDays = 7;

  // Get tasks for the next 7 days
  const upcomingTasks = tasks
    .filter((task) => {
      const taskDate = startOfDay(task.deadline);
      return taskDate >= today && taskDate <= addDays(today, upcomingDays);
    })
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEE, MMM d');
  };

  const handleSync = (provider: 'google' | 'outlook') => {
    // In a real app, this would trigger calendar sync
    console.log(`Syncing with ${provider}`);
  };

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Deadlines
        </h2>
      </div>

      {/* Calendar Sync Buttons */}
      <div className="flex gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSync('google')}
          className="flex-1 text-xs glass-input border-border hover:bg-secondary"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Google
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSync('outlook')}
          className="flex-1 text-xs glass-input border-border hover:bg-secondary"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Outlook
        </Button>
      </div>

      {/* Upcoming Tasks List */}
      <div className="space-y-3 max-h-[250px] overflow-y-auto scrollbar-thin">
        {upcomingTasks.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">
            No upcoming deadlines this week.
          </p>
        ) : (
          upcomingTasks.map((task) => (
            <div
              key={task.id}
              className="p-3 rounded-lg bg-secondary/50 border border-border flex items-center gap-3"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  task.priority === 'emergency'
                    ? 'bg-emergency animate-pulse'
                    : task.priority === 'high'
                    ? 'bg-orange-400'
                    : task.priority === 'medium'
                    ? 'bg-warning'
                    : 'bg-success'
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                <p className="text-xs text-muted-foreground">
                  {getDateLabel(task.deadline)} • {format(task.deadline, 'h:mm a')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
