import { useState } from 'react';
import { Task, TaskStatus } from '@/types/task';
import { PriorityBadge } from './PriorityBadge';
import { CountdownTimer } from './CountdownTimer';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MessageSquare, CheckCircle2, Clock, PlayCircle, Save } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  style?: React.CSSProperties;
}

const statusConfig: Record<TaskStatus, { label: string; icon: React.ReactNode; color: string }> = {
  'not-started': {
    label: 'Not Started',
    icon: <Clock className="h-4 w-4" />,
    color: 'text-muted-foreground',
  },
  'in-progress': {
    label: 'In Progress',
    icon: <PlayCircle className="h-4 w-4" />,
    color: 'text-warning',
  },
  completed: {
    label: 'Completed',
    icon: <CheckCircle2 className="h-4 w-4" />,
    color: 'text-success',
  },
};

export function TaskCard({ task, onUpdate, style }: TaskCardProps) {
  const [localProgress, setLocalProgress] = useState(task.progress);
  const [localComments, setLocalComments] = useState(task.comments);
  const [hasChanges, setHasChanges] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleProgressChange = (value: number[]) => {
    setLocalProgress(value[0]);
    setHasChanges(true);
  };

  const handleStatusChange = (status: TaskStatus) => {
    onUpdate(task.id, { status });
  };

  const handleSave = () => {
    onUpdate(task.id, { progress: localProgress, comments: localComments });
    setHasChanges(false);
  };

  const statusInfo = statusConfig[task.status];

  return (
    <div
      className={cn(
        'glass-card-elevated p-5 transition-all duration-300 hover:scale-[1.02] cursor-pointer',
        task.priority === 'emergency' && 'ring-2 ring-emergency/50 animate-pulse-glow'
      )}
      style={style}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{task.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
        </div>
        <PriorityBadge priority={task.priority} />
      </div>

      {/* Deadline & Timer */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Deadline:</span>{' '}
          {format(task.deadline, 'MMM d, yyyy h:mm a')}
        </div>
        <CountdownTimer deadline={task.deadline} />
      </div>

      {/* Progress */}
      <div className="mb-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-sm text-muted-foreground">{localProgress}%</span>
        </div>
        <Progress value={localProgress} className="h-2 mb-3" />
        <Slider
          value={[localProgress]}
          onValueChange={handleProgressChange}
          max={100}
          step={5}
          className="cursor-pointer"
        />
      </div>

      {/* Status */}
      <div className="mb-4" onClick={(e) => e.stopPropagation()}>
        <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
        <Select value={task.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="glass-input">
            <SelectValue>
              <div className={cn('flex items-center gap-2', statusInfo.color)}>
                {statusInfo.icon}
                {statusInfo.label}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="glass-card-elevated border-border">
            {Object.entries(statusConfig).map(([value, config]) => (
              <SelectItem key={value} value={value}>
                <div className={cn('flex items-center gap-2', config.color)}>
                  {config.icon}
                  {config.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-border animate-fade-in" onClick={(e) => e.stopPropagation()}>
          {/* Comments */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Your Comments
            </label>
            <Textarea
              value={localComments}
              onChange={(e) => {
                setLocalComments(e.target.value);
                setHasChanges(true);
              }}
              placeholder="Add notes or updates about this task..."
              className="glass-input min-h-[80px] text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>

          {/* Feedback from Chair */}
          {task.feedback && (
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <label className="text-sm font-medium text-primary mb-1 block">
                Feedback from Chair
              </label>
              <p className="text-sm text-foreground">{task.feedback}</p>
            </div>
          )}

          {/* Save Button */}
          {hasChanges && (
            <Button onClick={handleSave} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
