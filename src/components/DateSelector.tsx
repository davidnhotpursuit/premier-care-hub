
import { format, addDays, subDays, isToday, isSameDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DateSelectorProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export const DateSelector = ({ selectedDate, onDateSelect }: DateSelectorProps) => {
  const today = new Date();
  const isLive = isToday(selectedDate);
  
  // Generate last 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    return subDays(today, 6 - i);
  });

  const getLiveStatus = () => {
    if (isLive) {
      const currentHour = new Date().getHours();
      if (currentHour >= 6 && currentHour < 22) {
        return { status: 'Live', color: 'bg-green-500', text: 'Live Data • Updating' };
      } else {
        return { status: 'Finished', color: 'bg-gray-500', text: 'Day Ended • Final Data' };
      }
    }
    return { status: 'Finished', color: 'bg-gray-500', text: 'Finalized • No further updates' };
  };

  const liveStatus = getLiveStatus();

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Date Strip */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap mr-3">
            Select Date:
          </span>
          <div className="flex space-x-2">
            {dates.map((date) => (
              <Button
                key={date.toISOString()}
                variant={isSameDay(date, selectedDate) ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap px-3 py-2 text-xs"
                onClick={() => onDateSelect(date)}
              >
                <div className="text-center">
                  <div className="font-medium">
                    {format(date, 'EEE')}
                  </div>
                  <div className="text-xs opacity-80">
                    {format(date, 'M/d')}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Live Status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${liveStatus.color} ${isLive ? 'animate-pulse-dot' : ''}`} />
            <span className="text-sm font-medium text-gray-700">
              {liveStatus.text}
            </span>
          </div>
          <Badge 
            variant={isLive ? "default" : "secondary"}
            className={isLive ? "bg-green-500 hover:bg-green-600" : ""}
          >
            {liveStatus.status}
          </Badge>
        </div>
      </div>
    </div>
  );
};
