
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, MessageSquare } from 'lucide-react';

interface KPICardsProps {
  selectedDate: Date;
}

export const KPICards = ({ selectedDate }: KPICardsProps) => {
  // Sample data - in real app would come from API
  const data = {
    scheduledVisits: 178,
    completedVisits: 149,
    evvCompliance: 83.7,
    smsReminders: 45,
    voiceCalls: 18,
    clockInsSuccess: 89,
    clockOutsSuccess: 86
  };

  const getComplianceColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 80) return 'bg-warning';
    return 'bg-destructive';
  };

  const getComplianceTextColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-700';
    if (percentage >= 80) return 'text-yellow-700';
    return 'text-red-700';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
      {/* EVV Compliance Card - 30% width on desktop */}
      <Card className="lg:col-span-3 shadow-sm border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">EVV Compliance</h3>
            <div className={`text-2xl font-bold ${getComplianceTextColor(data.evvCompliance)}`}>
              {data.evvCompliance}%
            </div>
          </div>
          
          {/* Main Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Compliance</span>
              <span>{data.completedVisits} of {data.scheduledVisits} visits</span>
            </div>
            <Progress 
              value={data.evvCompliance} 
              className="h-3"
            />
          </div>

          {/* Mini Progress Bars */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Clock-Ins Success</span>
                <span>{data.clockInsSuccess}%</span>
              </div>
              <Progress 
                value={data.clockInsSuccess} 
                className="h-2"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Clock-Outs Success</span>
                <span>{data.clockOutsSuccess}%</span>
              </div>
              <Progress 
                value={data.clockOutsSuccess} 
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metric Cards - 70% width on desktop, split into 3 cards */}
      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Visit Overview Card */}
        <Card className="shadow-sm border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Visits</p>
                <p className="text-sm font-medium text-gray-900">Scheduled: {data.scheduledVisits}</p>
                <p className="text-sm text-gray-600">Completed: {data.completedVisits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clock-In/Out Compliance Card */}
        <Card className="shadow-sm border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Clock Success</p>
                <p className="text-sm font-medium text-gray-900">Clock-Ins: {data.clockInsSuccess}%</p>
                <p className="text-sm text-gray-600">Clock-Outs: {data.clockOutsSuccess}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Outreach Activity Card */}
        <Card className="shadow-sm border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Outreach</p>
                <p className="text-sm font-medium text-gray-900">SMS Sent: {data.smsReminders}</p>
                <p className="text-sm text-gray-600">Voice Calls: {data.voiceCalls}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
