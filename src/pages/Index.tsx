import { useState, useMemo } from 'react';
import { Header } from '@/components/dashboard/Header';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { TaskFilters } from '@/components/dashboard/TaskFilters';
import { PersonalNotes } from '@/components/dashboard/PersonalNotes';
import { PerformanceWidget } from '@/components/dashboard/PerformanceWidget';
import { CalendarWidget } from '@/components/dashboard/CalendarWidget';
import { Task, Priority, TaskStatus, Notification, PersonalNote } from '@/types/task';
import {
  mockTasks,
  mockNotifications,
  mockNotes,
  mockPerformance,
} from '@/data/mockData';
import { toast } from 'sonner';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [notes, setNotes] = useState<PersonalNote[]>(mockNotes);

  // Filters
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      return matchesPriority && matchesStatus;
    });
  }, [tasks, priorityFilter, statusFilter]);

  // Sort by priority and deadline
  const sortedTasks = useMemo(() => {
    const priorityOrder: Record<Priority, number> = {
      emergency: 0,
      high: 1,
      medium: 2,
      low: 3,
    };

    return [...filteredTasks].sort((a, b) => {
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
  }, [filteredTasks]);

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updates, updatedAt: new Date() } : task
      )
    );
    toast.success('Task updated successfully');
  };

  const handleNotificationRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const handleAddNote = (content: string) => {
    const newNote: PersonalNote = {
      id: Date.now().toString(),
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes((prev) => [newNote, ...prev]);
    toast.success('Note added');
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    toast.success('Note deleted');
  };

  const handleUpdateNote = (noteId: string, content: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === noteId ? { ...n, content, updatedAt: new Date() } : n
      )
    );
  };

  const clearFilters = () => {
    setPriorityFilter('all');
    setStatusFilter('all');
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header
          notifications={notifications}
          onNotificationRead={handleNotificationRead}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <TaskFilters
              priorityFilter={priorityFilter}
              statusFilter={statusFilter}
              onPriorityChange={setPriorityFilter}
              onStatusChange={setStatusFilter}
              onClearFilters={clearFilters}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  My Tasks
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({sortedTasks.length})
                  </span>
                </h2>
              </div>

              <div className="grid gap-4">
                {sortedTasks.length === 0 ? (
                  <div className="glass-card p-8 text-center">
                    <p className="text-muted-foreground">
                      No tasks match your current filters.
                    </p>
                  </div>
                ) : (
                  sortedTasks.map((task, index) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdate={handleTaskUpdate}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <PerformanceWidget stats={mockPerformance} />
            <CalendarWidget tasks={tasks} />
            <PersonalNotes
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              onUpdateNote={handleUpdateNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
