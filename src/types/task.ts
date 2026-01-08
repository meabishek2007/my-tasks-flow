export type Priority = 'low' | 'medium' | 'high' | 'emergency';
export type TaskStatus = 'not-started' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  deadline: Date;
  status: TaskStatus;
  progress: number;
  comments: string;
  feedback?: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  type: 'new-task' | 'priority-update' | 'deadline-approaching' | 'emergency';
  title: string;
  message: string;
  taskId?: string;
  read: boolean;
  createdAt: Date;
}

export interface PersonalNote {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PerformanceStats {
  completedTasks: number;
  totalTasks: number;
  onTimeCompletions: number;
  lateCompletions: number;
  score: number;
}
