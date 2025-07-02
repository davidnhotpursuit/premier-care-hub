
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Check, Phone, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AlertsSectionProps {
  selectedDate: Date;
}

export const AlertsSection = ({ selectedDate }: AlertsSectionProps) => {
  const [resolvedAlerts, setResolvedAlerts] = useState<number[]>([]);

  // Sample alert data
  const activeAlerts = [
    {
      id: 1,
      caregiverName: 'Sarah Johnson',
      phone: '(555) 123-4567',
      caregiverId: 'CG001',
      patientName: 'Mary Smith',
      missedType: 'Clock-In',
      scheduledTime: '09:00 AM',
      isNew: true
    },
    {
      id: 2,
      caregiverName: 'Mike Davis',
      phone: '(555) 987-6543',
      caregiverId: 'CG002',
      patientName: 'John Brown',
      missedType: 'Clock-Out',
      scheduledTime: '02:30 PM',
      isNew: true
    }
  ];

  const flaggedCaregivers = [
    {
      id: 3,
      caregiverName: 'Lisa Wilson',
      phone: '(555) 456-7890',
      caregiverId: 'CG003',
      patientName: 'Robert Taylor',
      missedType: 'Both',
      resolvedAt: '11:45 AM'
    },
    {
      id: 4,
      caregiverName: 'David Chen',
      phone: '(555) 321-0987',
      caregiverId: 'CG004',
      patientName: 'Anna Martinez',
      missedType: 'Clock-In',
      resolvedAt: '10:15 AM'
    }
  ];

  const handleResolve = (alertId: number) => {
    setResolvedAlerts(prev => [...prev, alertId]);
  };

  const getMissedTypeColor = (type: string) => {
    switch (type) {
      case 'Clock-In': return 'bg-yellow-100 text-yellow-800';
      case 'Clock-Out': return 'bg-orange-100 text-orange-800';
      case 'Both': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="alerts" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Active Alerts ({activeAlerts.length})</span>
          </TabsTrigger>
          <TabsTrigger value="flagged" className="flex items-center space-x-2">
            <Check className="h-4 w-4" />
            <span>Flagged Today ({flaggedCaregivers.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Real-Time Alerts - Manual Review Required</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeAlerts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <p>No active alerts! All visits are on track.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-3 text-sm font-medium text-gray-600">Status</th>
                        <th className="pb-3 text-sm font-medium text-gray-600">Caregiver</th>
                        <th className="pb-3 text-sm font-medium text-gray-600">Contact</th>
                        <th className="pb-3 text-sm font-medium text-gray-600">Patient</th>
                        <th className="pb-3 text-sm font-medium text-gray-600">Issue</th>
                        <th className="pb-3 text-sm font-medium text-gray-600">Scheduled</th>
                        <th className="pb-3 text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeAlerts.map((alert) => (
                        <tr 
                          key={alert.id} 
                          className={`border-b hover:bg-gray-50 transition-colors ${
                            resolvedAlerts.includes(alert.id) ? 'opacity-50 bg-gray-50' : ''
                          }`}
                        >
                          <td className="py-4">
                            {alert.isNew && !resolvedAlerts.includes(alert.id) && (
                              <Badge variant="destructive" className="text-xs">
                                New
                              </Badge>
                            )}
                            {resolvedAlerts.includes(alert.id) && (
                              <Badge variant="secondary" className="text-xs">
                                Resolved
                              </Badge>
                            )}
                          </td>
                          <td className="py-4">
                            <div>
                              <p className="font-medium text-gray-900">{alert.caregiverName}</p>
                              <p className="text-sm text-gray-500">ID: {alert.caregiverId}</p>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-700">{alert.phone}</span>
                              <div className="flex space-x-1">
                                <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                                  <MessageSquare className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                                  <Phone className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-gray-700">{alert.patientName}</td>
                          <td className="py-4">
                            <Badge className={getMissedTypeColor(alert.missedType)}>
                              {alert.missedType}
                            </Badge>
                          </td>
                          <td className="py-4 text-sm text-gray-700">{alert.scheduledTime}</td>
                          <td className="py-4">
                            {!resolvedAlerts.includes(alert.id) && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleResolve(alert.id)}
                                className="text-green-600 border-green-600 hover:bg-green-50"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Mark Resolved
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-blue-500" />
                <span>Caregivers Flagged Today - Daily Intervention Log</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {flaggedCaregivers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No caregivers have been flagged today.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-3 text-sm font-medium text-gray-600">Caregiver</th>
                        <th className="pb-3 text-sm font-medium text-gray-600">Contact</th>
                        <th className="pb-3 text-sm font-medium text-gray-600">Patient</th>
                        <th className="pb-3 text-sm font-medium text-gray-600">Issue Type</th>
                        <th className="pb-3 text-sm font-medium text-gray-600">Resolved At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {flaggedCaregivers.map((caregiver) => (
                        <tr key={caregiver.id} className="border-b hover:bg-gray-50">
                          <td className="py-4">
                            <div>
                              <p className="font-medium text-gray-900">{caregiver.caregiverName}</p>
                              <p className="text-sm text-gray-500">ID: {caregiver.caregiverId}</p>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-gray-700">{caregiver.phone}</td>
                          <td className="py-4 text-sm text-gray-700">{caregiver.patientName}</td>
                          <td className="py-4">
                            <Badge className={getMissedTypeColor(caregiver.missedType)}>
                              {caregiver.missedType}
                            </Badge>
                          </td>
                          <td className="py-4 text-sm text-gray-700">{caregiver.resolvedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
