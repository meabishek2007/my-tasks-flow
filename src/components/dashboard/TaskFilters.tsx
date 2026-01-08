import { Priority, TaskStatus } from '@/types/task';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface TaskFiltersProps {
  priorityFilter: Priority | 'all';
  statusFilter: TaskStatus | 'all';
  onPriorityChange: (value: Priority | 'all') => void;
  onStatusChange: (value: TaskStatus | 'all') => void;
  onClearFilters: () => void;
}

export function TaskFilters({
  priorityFilter,
  statusFilter,
  onPriorityChange,
  onStatusChange,
  onClearFilters,
}: TaskFiltersProps) {
  const hasActiveFilters = priorityFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="glass-card p-4 mb-6 flex flex-wrap items-center gap-4 animate-fade-in">
      <div className="flex items-center gap-2 text-foreground">
        <Filter className="h-4 w-4" />
        <span className="font-medium">Filters</span>
      </div>

      <Select value={priorityFilter} onValueChange={onPriorityChange}>
        <SelectTrigger className="w-[150px] glass-input">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent className="glass-card-elevated border-border">
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="emergency">🚨 Emergency</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[150px] glass-input">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="glass-card-elevated border-border">
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="not-started">Not Started</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
