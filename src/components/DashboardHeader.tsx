
import { Badge } from '@/components/ui/badge';

export const DashboardHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src="/lovable-uploads/03966cf0-1b80-4737-81a2-c9f4cf4ed101.png" 
            alt="Premier Care Logo" 
            className="h-16 w-auto"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Real-time EVV Compliance Tracking
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="text-sm">
            Office Coordinator View
          </Badge>
        </div>
      </div>
    </div>
  );
};
