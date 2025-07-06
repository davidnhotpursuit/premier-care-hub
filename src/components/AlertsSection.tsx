import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertTriangle, Phone, MessageSquare } from 'lucide-react';

interface AlertsSectionProps {
  selectedDate: Date;
}

export const AlertsSection = ({ selectedDate }: AlertsSectionProps) => {
  const [activeTab, setActiveTab] = useState('active');

  // Sample data - in real app would come from API
  const alertsData = {
    active: [
      { id: 1, type: 'Missed EVV', description: 'Visit for John Doe on 8:00 AM', caregiver: 'Jane Smith' },
      { id: 2, type: 'Late Clock-In', description: 'Visit for Alice Johnson on 10:00 AM', caregiver: 'Bob Williams' },
    ],
    flagged: [
      { id: 3, type: 'Unusual Activity', description: 'Prolonged visit for Michael Brown', caregiver: 'Jane Smith' },
    ],
    reminders: [
      { id: 4, type: 'SMS Sent', description: 'Reminder sent to Emily White for 2:00 PM visit', caregiver: 'Bob Williams' },
      { id: 5, type: 'Voice Call', description: 'Voice call made to David Lee for upcoming visit', caregiver: 'Jane Smith' },
    ],
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'Missed EVV':
      case 'Unusual Activity':
        return <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />;
      case 'Late Clock-In':
        return <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />;
      case 'SMS Sent':
        return <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />;
      case 'Voice Call':
        return <Phone className="h-4 w-4 mr-2 text-purple-500" />;
      default:
        return <CheckCircle className="h-4 w-4 mr-2 text-green-500" />;
    }
  };

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-lg font-semibold">Alerts & Reminders</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active" className="relative">
              Active Alerts ({alertsData.active.length})
            </TabsTrigger>
            <TabsTrigger value="flagged" className="relative">
              Flagged Today ({alertsData.flagged.length})
            </TabsTrigger>
            <TabsTrigger value="reminders" className="relative">
              Reminders ({alertsData.reminders.length})
            </TabsTrigger>
          </TabsList>
          <div className="p-4">
            <TabsContent value="active" className="space-y-4">
              {alertsData.active.map((alert) => (
                <div key={alert.id} className="border rounded-md p-3 bg-gray-50">
                  <div className="flex items-center text-sm">
                    {getAlertIcon(alert.type)}
                    <span className="font-medium">{alert.type}:</span> {alert.description}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Caregiver: {alert.caregiver}
                  </div>
                </div>
              ))}
              {alertsData.active.length === 0 && (
                <div className="text-sm text-gray-500">No active alerts for today.</div>
              )}
            </TabsContent>

            <TabsContent value="flagged" className="space-y-4">
              {alertsData.flagged.map((alert) => (
                <div key={alert.id} className="border rounded-md p-3 bg-gray-50">
                  <div className="flex items-center text-sm">
                    {getAlertIcon(alert.type)}
                    <span className="font-medium">{alert.type}:</span> {alert.description}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Caregiver: {alert.caregiver}
                  </div>
                </div>
              ))}
              {alertsData.flagged.length === 0 && (
                <div className="text-sm text-gray-500">No flagged items for today.</div>
              )}
            </TabsContent>

            <TabsContent value="reminders" className="space-y-4">
              {alertsData.reminders.map((alert) => (
                <div key={alert.id} className="border rounded-md p-3 bg-gray-50">
                  <div className="flex items-center text-sm">
                    {getAlertIcon(alert.type)}
                    <span className="font-medium">{alert.type}:</span> {alert.description}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Caregiver: {alert.caregiver}
                  </div>
                </div>
              ))}
              {alertsData.reminders.length === 0 && (
                <div className="text-sm text-gray-500">No reminders sent today.</div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
