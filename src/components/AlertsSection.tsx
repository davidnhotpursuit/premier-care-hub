
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Phone, MessageSquare } from 'lucide-react';

interface AlertsSectionProps {
  selectedDate: Date;
}

export const AlertsSection = ({ selectedDate }: AlertsSectionProps) => {
  const [activeTab, setActiveTab] = useState('active');

  // Sample data - in real app would come from API
  const activeAlertsData = [
    { 
      id: 1, 
      status: 'New',
      caregiver: 'Sarah Johnson', 
      caregiverId: 'CG001',
      contact: '(555) 123-4567',
      patient: 'Mary Smith', 
      issue: 'Clock-In',
      scheduled: '09:00 AM'
    },
    { 
      id: 2, 
      status: 'New',
      caregiver: 'Mike Davis', 
      caregiverId: 'CG002',
      contact: '(555) 987-6543',
      patient: 'John Brown', 
      issue: 'Clock-Out',
      scheduled: '02:30 PM'
    },
  ];

  const flaggedCaregiversData = [
    { 
      id: 1,
      caregiver: 'Lisa Wilson', 
      caregiverId: 'CG003',
      contact: '(555) 456-7890',
      patient: 'Robert Taylor', 
      issueType: 'Both',
      resolvedAt: '11:45 AM'
    },
    { 
      id: 2,
      caregiver: 'David Chen', 
      caregiverId: 'CG004',
      contact: '(555) 321-0987',
      patient: 'Anna Martinez', 
      issueType: 'Clock-In',
      resolvedAt: '10:15 AM'
    },
  ];

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-lg font-semibold">Alerts & Reminders</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active" className="relative">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Active Alerts ({activeAlertsData.length})
            </TabsTrigger>
            <TabsTrigger value="flagged" className="relative">
              Flagged Today ({flaggedCaregiversData.length})
            </TabsTrigger>
          </TabsList>
          
          <div className="p-4">
            <TabsContent value="active" className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h3 className="text-base font-semibold">Real-Time Alerts - Manual Review Required</h3>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Caregiver</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeAlertsData.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <Badge variant="destructive" className="text-xs">
                          {alert.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{alert.caregiver}</div>
                          <div className="text-xs text-gray-500">ID: {alert.caregiverId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{alert.contact}</span>
                          <MessageSquare className="h-4 w-4 text-blue-500 cursor-pointer" />
                          <Phone className="h-4 w-4 text-green-500 cursor-pointer" />
                        </div>
                      </TableCell>
                      <TableCell>{alert.patient}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={alert.issue === 'Clock-In' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {alert.issue}
                        </Badge>
                      </TableCell>
                      <TableCell>{alert.scheduled}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="text-green-600 border-green-600">
                          ✓ Mark Resolved
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="flagged" className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-base font-semibold">Caregivers Flagged Today - Daily Intervention Log</span>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Caregiver</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Issue Type</TableHead>
                    <TableHead>Resolved At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flaggedCaregiversData.map((caregiver) => (
                    <TableRow key={caregiver.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{caregiver.caregiver}</div>
                          <div className="text-xs text-gray-500">ID: {caregiver.caregiverId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{caregiver.contact}</TableCell>
                      <TableCell>{caregiver.patient}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={caregiver.issueType === 'Both' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {caregiver.issueType}
                        </Badge>
                      </TableCell>
                      <TableCell>{caregiver.resolvedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
