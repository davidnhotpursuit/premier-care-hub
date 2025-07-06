
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ViewToggleProps {
  currentView: 'daily' | 'weekly';
  onViewChange: (view: 'daily' | 'weekly') => void;
}

export const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  return (
    <div className="mb-4">
      <ToggleGroup 
        type="single" 
        value={currentView} 
        onValueChange={(value) => value && onViewChange(value as 'daily' | 'weekly')}
        className="bg-white rounded-lg shadow-sm border p-1"
      >
        <ToggleGroupItem 
          value="daily" 
          className="px-6 py-2 rounded-md data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          Daily View
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="weekly" 
          className="px-6 py-2 rounded-md data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          Weekly Summary
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
