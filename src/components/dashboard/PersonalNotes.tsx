import { useState } from 'react';
import { PersonalNote } from '@/types/task';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { StickyNote, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface PersonalNotesProps {
  notes: PersonalNote[];
  onAddNote: (content: string) => void;
  onDeleteNote: (id: string) => void;
  onUpdateNote: (id: string, content: string) => void;
}

export function PersonalNotes({ notes, onAddNote, onDeleteNote, onUpdateNote }: PersonalNotesProps) {
  const [newNote, setNewNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote('');
      setIsAdding(false);
    }
  };

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <StickyNote className="h-5 w-5 text-primary" />
          Personal Notes
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAdding(!isAdding)}
          className="text-primary hover:text-primary/80"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {isAdding && (
        <div className="mb-4 animate-fade-in">
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write a private note..."
            className="glass-input min-h-[80px] text-foreground placeholder:text-muted-foreground mb-2 resize-none"
            autoFocus
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleAddNote}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save Note
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsAdding(false);
                setNewNote('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin">
        {notes.length === 0 && !isAdding ? (
          <p className="text-muted-foreground text-sm text-center py-4">
            No notes yet. Click + to add one.
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="p-3 rounded-lg bg-secondary/50 border border-border group"
            >
              <p className="text-sm text-foreground whitespace-pre-wrap">{note.content}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">
                  {format(note.updatedAt, 'MMM d, yyyy h:mm a')}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteNote(note.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-emergency h-6 w-6 p-0"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
