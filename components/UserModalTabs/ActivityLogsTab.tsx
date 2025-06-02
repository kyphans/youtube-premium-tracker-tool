import React from 'react';

interface ActivityLogsTabProps {
  userLogs: any[];
  formatLogValue: (value: any) => string;
}

const ActivityLogsTab: React.FC<ActivityLogsTabProps> = ({ userLogs, formatLogValue }) => {
  return (
    <div className="max-h-96 overflow-y-auto">
      {userLogs.length > 0 ? (
        <div className="space-y-2">
          {userLogs.map((log) => (
            <div key={log.id} className="border rounded-lg p-3 bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="font-medium text-sm">{log.action}</div>
                <div className="text-xs text-gray-500">{log.timestamp}</div>
              </div>
              <div className="text-sm text-gray-600 mt-1">{log.details}</div>
              {log.changes && log.changes.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="text-xs font-medium text-gray-700">Changes:</div>
                  {log.changes.map((change: any, index: number) => (
                    <div key={index} className="text-xs bg-white p-2 rounded border">
                      <span className="font-medium">{change.field}:</span>{' '}
                      <span className="text-red-600">{formatLogValue(change.oldValue)}</span>{' '}
                      → <span className="text-green-600">{formatLogValue(change.newValue)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          No activity logs found for this user.
        </div>
      )}
    </div>
  );
};

export default ActivityLogsTab; 