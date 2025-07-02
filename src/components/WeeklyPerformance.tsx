
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface WeeklyPerformanceProps {
  selectedWeek: number;
  onWeekChange: (week: number) => void;
}

export const WeeklyPerformance = ({ selectedWeek, onWeekChange }: WeeklyPerformanceProps) => {
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null);

  // Sample weekly trend data
  const weeklyTrendData = [
    { week: 'Jul 1-7', compliance: 87.6, visits: 1245 },
    { week: 'Jun 24-30', compliance: 82.1, visits: 1189 },
    { week: 'Jun 17-23', compliance: 89.3, visits: 1267 },
    { week: 'Jun 10-16', compliance: 85.7, visits: 1203 }
  ];

  // Sample daily breakdown data
  const dailyBreakdownData = [
    { day: 'Mon', compliance: 89, visits: 178, clockIns: 91, clockOuts: 87 },
    { day: 'Tue', compliance: 85, visits: 167, clockIns: 88, clockOuts: 82 },
    { day: 'Wed', compliance: 92, visits: 183, clockIns: 94, clockOuts: 90 },
    { day: 'Thu', compliance: 87, visits: 172, clockIns: 90, clockOuts: 84 },
    { day: 'Fri', compliance: 84, visits: 169, clockIns: 87, clockOuts: 81 },
    { day: 'Sat', compliance: 88, visits: 156, clockIns: 91, clockOuts: 85 },
    { day: 'Sun', compliance: 90, visits: 142, clockIns: 93, clockOuts: 87 }
  ];

  // Sample caregiver ranking data
  const caregiverRankings = [
    { id: 1, name: 'Sarah Johnson', phone: '(555) 123-4567', caregiverId: 'CG001', visits: 24, clockIns: 96, clockOuts: 92, compliance: 94 },
    { id: 2, name: 'Mike Davis', phone: '(555) 987-6543', caregiverId: 'CG002', visits: 22, clockIns: 91, clockOuts: 86, compliance: 88 },
    { id: 3, name: 'Lisa Wilson', phone: '(555) 456-7890', caregiverId: 'CG003', visits: 26, clockIns: 85, clockOuts: 81, compliance: 83 },
    { id: 4, name: 'David Chen', phone: '(555) 321-0987', caregiverId: 'CG004', visits: 18, clockIns: 78, clockOuts: 72, compliance: 75 },
    { id: 5, name: 'Emma Rodriguez', phone: '(555) 654-3210', caregiverId: 'CG005', visits: 20, clockIns: 90, clockOuts: 88, compliance: 89 }
  ];

  const getComplianceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplianceBadgeColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Weekly Performance Summary</h2>
        <Select value={selectedWeek.toString()} onValueChange={(value) => onWeekChange(parseInt(value))}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Current Week (Jul 1-7)</SelectItem>
            <SelectItem value="1">Last Week (Jun 24-30)</SelectItem>
            <SelectItem value="2">2 Weeks Ago (Jun 17-23)</SelectItem>
            <SelectItem value="3">3 Weeks Ago (Jun 10-16)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Compliance Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <span>Weekly Compliance Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[70, 100]} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'compliance' ? `${value}%` : value,
                    name === 'compliance' ? 'Compliance' : 'Total Visits'
                  ]}
                />
                <Bar dataKey="compliance" fill="#3B82F6" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Day-by-Day Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Compliance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[70, 100]} />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}%`,
                    name === 'compliance' ? 'Compliance' :
                    name === 'clockIns' ? 'Clock-Ins' : 'Clock-Outs'
                  ]}
                />
                <Line type="monotone" dataKey="compliance" stroke="#3B82F6" strokeWidth={3} />
                <Line type="monotone" dataKey="clockIns" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="clockOuts" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Caregiver Ranking Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Caregiver Performance Rankings</span>
            <Badge variant="secondary">This Week</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 text-sm font-medium text-gray-600">Rank</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Caregiver</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Contact</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Visits</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Clock-Ins</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Clock-Outs</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Overall</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {caregiverRankings.map((caregiver, index) => (
                  <tr 
                    key={caregiver.id} 
                    className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCaregiverId(caregiver.caregiverId)}
                  >
                    <td className="py-4">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-gray-900">{caregiver.name}</p>
                        <p className="text-sm text-gray-500">ID: {caregiver.caregiverId}</p>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-700">{caregiver.phone}</td>
                    <td className="py-4 text-center font-medium">{caregiver.visits}</td>
                    <td className="py-4 text-center">
                      <span className={getComplianceColor(caregiver.clockIns)}>
                        {caregiver.clockIns}%
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      <span className={getComplianceColor(caregiver.clockOuts)}>
                        {caregiver.clockOuts}%
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`font-bold ${getComplianceColor(caregiver.compliance)}`}>
                        {caregiver.compliance}%
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <Badge className={getComplianceBadgeColor(caregiver.compliance)}>
                          {caregiver.compliance >= 90 ? 'Excellent' : 
                           caregiver.compliance >= 80 ? 'Good' : 'Needs Attention'}
                        </Badge>
                        {caregiver.compliance < 80 && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            Click on any caregiver row to view detailed visit history
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
