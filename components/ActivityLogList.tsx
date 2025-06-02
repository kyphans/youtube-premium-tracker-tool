import React from 'react';
import { ActivityLog, User } from '../types';

interface ActivityLogListProps {
  activityLogs: ActivityLog[];
  users: User[];
}

const formatLogValue = (value: any) => {
  if (value === null || value === undefined) return 'N/A';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
};

const ActivityLogList: React.FC<ActivityLogListProps> = ({ activityLogs, users }) => {
  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.description : 'Unknown User';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-4 min-h-[700px] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">System Activity Logs</h2>
      {activityLogs.length === 0 ? (
        <p className="text-gray-500">No activity logs yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {activityLogs.map(log => (
            <li key={log.id} className="py-5">
              <div className="flex justify-between items-start">
                <div className="font-medium text-sm">
                  {log.action}
                  {log.userId && (
                    <span className="ml-2 text-blue-600">{getUserName(log.userId)}</span>
                  )}
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap">{log.timestamp}</div>
              </div>
              <div className="text-sm text-gray-600 mt-1">{log.details}</div>
              {log.changes && log.changes.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="text-xs font-medium text-gray-700">Changes:</div>
                  {log.changes.map((change, idx) => (
                    <div key={idx} className="text-xs bg-white p-2 rounded border">
                      <span className="font-medium">{change.field}:</span>{' '}
                      <span className="text-red-600">{formatLogValue(change.oldValue)}</span>{' '}
                      → <span className="text-green-600">{formatLogValue(change.newValue)}</span>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityLogList; 