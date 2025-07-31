
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Phone, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';

interface AlertsSectionProps {
  selectedDate: Date;
}

export const AlertsSection = ({ selectedDate }: AlertsSectionProps) => {
  const [expandedAlerts, setExpandedAlerts] = useState<Set<number>>(new Set());
  const [resolvedAlerts, setResolvedAlerts] = useState<Set<number>>(new Set());

  // Sample data - in real app would come from API
  const activeAlertsData = [
    { 
      id: 1, 
      status: 'Unresolved',
      caregiver: 'Sarah Johnson', 
      caregiverId: 'CG001',
      contact: '(555) 123-4567',
      patient: 'Mary Smith',
      patientContact: '(555) 789-0123',
      issue: 'Clock-In',
      scheduled: '09:00 AM',
      clockInTime: '09:00 AM',
      clockOutTime: '12:00 PM',
      smsDelivered: true,
      callDelivered: true,
      patientReachable: false
    },
    { 
      id: 2, 
      status: 'Unresolved',
      caregiver: 'Mike Davis', 
      caregiverId: 'CG002',
      contact: '(555) 987-6543',
      patient: 'John Brown',
      patientContact: '(555) 456-7890',
      issue: 'Clock-Out',
      scheduled: '02:30 PM',
      clockInTime: '02:00 PM',
      clockOutTime: '02:30 PM',
      smsDelivered: true,
      callDelivered: false,
      patientReachable: true
    },
  ];

  const toggleAlert = (alertId: number) => {
    const newExpanded = new Set(expandedAlerts);
    if (newExpanded.has(alertId)) {
      newExpanded.delete(alertId);
    } else {
      newExpanded.add(alertId);
    }
    setExpandedAlerts(newExpanded);
  };

  const markResolved = (alertId: number) => {
    const newResolved = new Set(resolvedAlerts);
    newResolved.add(alertId);
    setResolvedAlerts(newResolved);
    
    // Close the dropdown when resolved
    const newExpanded = new Set(expandedAlerts);
    newExpanded.delete(alertId);
    setExpandedAlerts(newExpanded);
  };

  const revertToUnresolved = (alertId: number) => {
    const newResolved = new Set(resolvedAlerts);
    newResolved.delete(alertId);
    setResolvedAlerts(newResolved);
  };

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-lg font-semibold">Alerts & Reminders</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex flex-col space-y-1 mb-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h3 className="text-base font-semibold">Real-Time Alerts - Manual Review Required</h3>
            </div>
            <p className="text-sm text-gray-600 ml-7">Click each alert to view more details.</p>
          </div>
          
          {/* Column Headers */}
          <div className="grid grid-cols-6 gap-4 items-center px-4 py-2 bg-gray-50 border rounded-lg text-sm font-medium text-gray-700">
            <div>Status</div>
            <div>Caregiver</div>
            <div>Contact</div>
            <div>Patient</div>
            <div>Issue</div>
            <div>Actions</div>
          </div>
          
          <div className="space-y-2">
            {activeAlertsData.map((alert) => {
              const isExpanded = expandedAlerts.has(alert.id);
              const isResolved = resolvedAlerts.has(alert.id);
              
              return (
                <div key={alert.id} className={`border rounded-lg overflow-hidden transition-all duration-300 ${isResolved ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'}`}>
                  {/* Alert Header - Clickable */}
                  <div 
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${isResolved ? 'opacity-75' : ''}`}
                    onClick={() => toggleAlert(alert.id)}
                  >
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <div>
                        <Badge 
                          variant={isResolved ? "secondary" : "destructive"} 
                          className="text-xs"
                        >
                          {isResolved ? 'Resolved' : alert.status}
                        </Badge>
                      </div>
                      <div>
                        <div className="font-medium">{alert.caregiver}</div>
                        <div className="text-xs text-gray-500">ID: {alert.caregiverId}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{alert.contact}</span>
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <Phone className="h-4 w-4 text-green-500" />
                      </div>
                      <div>{alert.patient}</div>
                      <div>
                        <Badge 
                          variant={alert.issue === 'Clock-In' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {alert.issue}
                        </Badge>
                      </div>
                      <div>
                        {isResolved ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              revertToUnresolved(alert.id);
                            }}
                          >
                            ↺ Revert to Unresolved
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              markResolved(alert.id);
                            }}
                          >
                            ✓ Mark Resolved
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t bg-gray-50/50 animate-fade-in">
                      <div className="pt-4 space-y-4">
                        <div className="grid grid-cols-3 gap-6">
                          {/* Scheduled Visit Times */}
                          <div>
                            <h4 className="font-medium text-sm mb-2">Scheduled Visit:</h4>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">Clock-In: {alert.clockInTime}</span>
                                {alert.issue === 'Clock-In' && <span className="text-red-500 font-medium">❗ (Missed)</span>}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">Clock-Out: {alert.clockOutTime}</span>
                                {alert.issue === 'Clock-Out' && <span className="text-red-500 font-medium">❗ (Missed)</span>}
                              </div>
                            </div>
                          </div>

                          {/* Caregiver Details */}
                          <div>
                            <h4 className="font-medium text-sm mb-2">Caregiver:</h4>
                            <div className="space-y-1">
                              <div className="text-sm">Name: {alert.caregiver}</div>
                              <div className="text-sm">Phone: {alert.contact}</div>
                              <div className="flex items-center space-x-3 mt-2">
                                <div className="flex items-center space-x-1">
                                  {alert.smsDelivered ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-500" />
                                  )}
                                  <span className="text-xs">SMS</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {alert.callDelivered ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-500" />
                                  )}
                                  <span className="text-xs">Call</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Patient Details */}
                          <div>
                            <h4 className="font-medium text-sm mb-2">Patient:</h4>
                            <div className="space-y-1">
                              <div className="text-sm">Name: {alert.patient}</div>
                              <div className="text-sm">Phone: {alert.patientContact}</div>
                              <div className="flex items-center space-x-1 mt-2">
                                {alert.patientReachable ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-500" />
                                )}
                                <span className="text-xs">
                                  {alert.patientReachable ? 'Reachable' : 'Unreachable'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
