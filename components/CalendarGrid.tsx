'use client'
import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useIsClient } from 'usehooks-ts';

interface CalendarGridProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  users: User[];
  selectedUserIds: string[];
  onEditUser: (user: User) => void;
  statusFilter: 'DONE' | 'NONE' | 'PENDING' | null;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  onMonthChange,
  users,
  selectedUserIds,
  onEditUser,
  statusFilter
}) => {
  const isClient = useIsClient();
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    if (isClient) {
      setToday(new Date());
    }
  }, [isClient]);

  if (!isClient) return null;

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const formatDate = (day: number) => {
    const month = (currentMonth.getMonth() + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    return `${dayStr}/${month}/${currentMonth.getFullYear()}`;
  };

  const isDateInRange = (day: number, user: User) => {
    const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const startDate = new Date(user.startDate.split('/').reverse().join('-'));
    const endDate = new Date(user.endDate.split('/').reverse().join('-'));
    
    return currentDate >= startDate && currentDate <= endDate;
  };

  const getCellColor = (day: number, user: User) => {
    if (!isDateInRange(day, user)) return 'bg-gray-100';
    
    switch (user.status) {
      case 'DONE':
        return 'bg-blue-500';
      case 'NONE':
        return 'bg-red-500';
      case 'PENDING':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const isToday = (day: number) => {
    if (!today) return false;
    const cellDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return today.getDate() === cellDate.getDate() &&
           today.getMonth() === cellDate.getMonth() &&
           today.getFullYear() === cellDate.getFullYear();
  };

  const getFormattedCalendarTitle = () => {
    const dayNames = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    if (!today) return '';
    const isCurrentDate =
      today.getDate() === currentMonth.getDate() &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear();

    if (isCurrentDate) {
      const dayOfWeek = dayNames[currentMonth.getDay()];
      const day = currentMonth.getDate();
      const month = currentMonth.getMonth() + 1;
      const year = currentMonth.getFullYear();
      return `Hôm nay là - ${dayOfWeek}, ngày ${day} tháng ${month} năm ${year}`;
    } else {
      const month = currentMonth.getMonth() + 1;
      const year = currentMonth.getFullYear();
      return `Calendar - Tháng ${month} năm ${year}`;
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentMonth);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    onMonthChange(newDate);
  };

  const safeUsers = Array.isArray(users) ? users : [];
  const filteredUsers = statusFilter !== null
    ? safeUsers.filter(user => selectedUserIds.includes(user.id))
    : safeUsers;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-100 p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          {getFormattedCalendarTitle()}
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => today && onMonthChange(today)}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 overflow-x-auto relative">
        <div className="min-w-max relative">
          {/* Header with days */}
          <div className="flex bg-gray-50 rounded-t-lg sticky top-0 z-10">
            <div className="w-32 p-2 font-medium text-gray-700 border-r bg-gray-50 sticky left-0 z-20">User</div>
            {days.map(day => (
              <div 
                key={day} 
                className={`w-8 p-1 text-xs font-medium text-center border-r ${
                  isToday(day) 
                    ? 'bg-yellow-400 text-gray-900 font-bold' 
                    : 'text-gray-700'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* User rows */}
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex border-b hover:bg-gray-50 transition-colors">
              <div 
                className="w-32 p-2 text-sm font-medium text-gray-900 border-r bg-white truncate sticky left-0 z-10 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => onEditUser(user)}
                title="Click to edit user"
              >
                {user.description}
              </div>
              {days.map(day => (
                <div
                  key={`${user.id}-${day}`}
                  className={`w-8 h-8 transition-colors hover:opacity-80 border-r ${
                    isToday(day) 
                      ? 'border-l-2 border-r-2 border-yellow-400 opacity-80' 
                      : ''
                  } ${getCellColor(day, user)}`}
                  title={`${user.description} - ${formatDate(day)} - ${user.status}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 p-4 border-t">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>DONE</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>NONE</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>PENDING</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 border rounded"></div>
            <span>Outside service period</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-4 bg-yellow-400 rounded"></div>
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
