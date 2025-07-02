
import { Badge } from '@/components/ui/badge';

export const DashboardHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            EVV Compliance Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time Electronic Visit Verification tracking for PremiereCare
          </p>
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
