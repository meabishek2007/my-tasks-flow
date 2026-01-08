import { Bell, User, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Notification } from '@/types/task';
import { formatDistanceToNow } from 'date-fns';

interface HeaderProps {
  notifications: Notification[];
  onNotificationRead: (id: string) => void;
}

export function Header({ notifications, onNotificationRead }: HeaderProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const userName = 'Alex Johnson';

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'emergency':
        return '🚨';
      case 'deadline-approaching':
        return '⏰';
      case 'priority-update':
        return '📌';
      case 'new-task':
        return '📋';
      default:
        return '📢';
    }
  };

  return (
    <header className="glass-card px-6 py-4 mb-6 flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back, <span className="text-gradient">{userName}</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative hover:bg-secondary">
          <Calendar className="h-5 w-5 text-muted-foreground" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-secondary">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-emergency text-emergency-foreground text-xs animate-pulse">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 glass-card-elevated border-border p-2"
          >
            <div className="px-2 py-1.5 text-sm font-semibold text-foreground border-b border-border mb-2">
              Notifications
            </div>
            {notifications.length === 0 ? (
              <div className="px-2 py-4 text-center text-muted-foreground text-sm">
                No notifications
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex flex-col items-start gap-1 p-3 cursor-pointer rounded-lg mb-1 ${
                      !notification.read ? 'bg-secondary/50' : ''
                    } ${notification.type === 'emergency' ? 'border-l-2 border-emergency' : ''}`}
                    onClick={() => onNotificationRead(notification.id)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span>{getNotificationIcon(notification.type)}</span>
                      <span className="font-medium text-foreground flex-1">
                        {notification.title}
                      </span>
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      {notification.message}
                    </p>
                    <span className="text-xs text-muted-foreground pl-6">
                      {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                    </span>
                  </DropdownMenuItem>
                ))}
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-card-elevated border-border">
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-emergency">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
