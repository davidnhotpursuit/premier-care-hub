
import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ViewToggle } from '@/components/ViewToggle';
import { DateSelector } from '@/components/DateSelector';
import { KPICards } from '@/components/KPICards';
import { AlertsSection } from '@/components/AlertsSection';
import { WeeklyPerformance } from '@/components/WeeklyPerformance';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState(0); // 0 = current week
  const [currentView, setCurrentView] = useState<'daily' | 'weekly'>('daily');

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DashboardHeader />
        
        {/* View Toggle */}
        <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
        
        {/* Conditional Content Based on View */}
        {currentView === 'daily' ? (
          <>
            {/* Sticky Date Selector & Live Status */}
            <div className="sticky top-0 z-10 bg-gray-50 pb-4">
              <DateSelector 
                selectedDate={selectedDate} 
                onDateSelect={setSelectedDate}
              />
            </div>

            {/* Daily Overview Section */}
            <div className="space-y-6">
              <KPICards selectedDate={selectedDate} />
              <AlertsSection selectedDate={selectedDate} />
            </div>
          </>
        ) : (
          /* Weekly Performance Section */
          <div className="mt-4">
            <WeeklyPerformance 
              selectedWeek={selectedWeek}
              onWeekChange={setSelectedWeek}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
