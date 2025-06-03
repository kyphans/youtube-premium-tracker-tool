'use client'
import React, { useState, useEffect } from 'react';
import { User, ActivityLog } from '../types';
import UserTable from '../components/UserTable';
import CalendarGrid from '../components/CalendarGrid';
import UserModal from '../components/UserModal';
import { toast } from '../hooks/use-toast';
import ActivityLogList from '../components/ActivityLogList';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import { getUsers, createUser, updateUser, deleteUser } from '../lib/api/user';
import { useIsClient } from 'usehooks-ts';
import { getLogs, createLog } from '../lib/api/log';

export default function Home() {
  const isClient = useIsClient();
  const [users, setUsers] = useState<User[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [statusFilter, setStatusFilter] = useState<'DONE' | 'NONE' | 'PENDING' | null>(null);

  useEffect(() => {
    setCurrentMonth(new Date());
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        toast({
          title: 'Lỗi',
          description: 'Không thể tải danh sách người dùng.',
          variant: 'destructive',
        });
      }
    }
    async function fetchLogs() {
      try {
        const logs = await getLogs();
        setActivityLogs(Array.isArray(logs) ? logs : []);
      } catch (error) {
        setActivityLogs([]);
        toast({
          title: 'Lỗi',
          description: 'Không thể tải logs.',
          variant: 'destructive',
        });
      }
    }
    fetchUsers();
    fetchLogs();
  }, []);

  if (!isClient) return null;

  const handleAddUser = () => {
    setEditingUser(undefined);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    try {
      await deleteUser(userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
      if (selectedUserIds.includes(userId)) {
        setSelectedUserIds(prev => prev.filter(id => id !== userId));
      }
      // Ghi log vào database
      const newLog = await createLog({
        userId: Number(userId),
        action: '[User Deleted]',
        details: `User account "${userToDelete?.description}" was deleted`,
      });
      setActivityLogs(prev => Array.isArray(prev) ? [newLog, ...prev] : [newLog]);
      toast({
        title: '[User Deleted]',
        description: `User "${userToDelete?.description}" has been deleted.`,
        variant: 'destructive',
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể xóa người dùng.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveUser = async (userData: User, changes?: { field: string; oldValue: any; newValue: any; }[]) => {
    const isEditing = editingUser !== undefined;
    try {
      let newUser: User;
      if (isEditing) {
        newUser = await updateUser(userData.id, userData);
        setUsers(prev => prev.map(user => user.id === userData.id ? newUser : user));
      } else {
        newUser = await createUser(userData);
        setUsers(prev => [...prev, newUser]);
      }
      // Ghi log vào database
      let details = isEditing ? 'User information was updated' : 'New user account was created';
      if (changes && changes.length > 0) {
        const changeDescriptions = changes.map(change =>
          `${change.field} changed from "${change.oldValue}" to "${change.newValue}"`
        ).join(', ');
        details = `${changeDescriptions}`;
      }
      const newLog = await createLog({
        userId: isEditing ? Number(userData.id) : Number(newUser.id),
        action: isEditing ? '[User Updated]' : '[User Created]',
        details,
        changes
      });
      setActivityLogs(prev => Array.isArray(prev) ? [newLog, ...prev] : [newLog]);
      toast({
        title: isEditing ? 'User Updated' : 'User Created',
        description: isEditing
          ? (changes && changes.length > 0
              ? `User "${userData.description}" updated: ` + changes.map(change => `${change.field} changed from "${change.oldValue}" to "${change.newValue}"`).join(', ')
              : `User "${userData.description}" has been updated.`)
          : `User "${userData.description}" has been added.`,
        variant: isEditing ? 'info' : 'success',
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: isEditing ? 'Không thể cập nhật người dùng.' : 'Không thể tạo người dùng mới.',
        variant: 'destructive',
      });
    }
  };

  const handleStatusFilter = (status: 'DONE' | 'NONE' | 'PENDING') => {
    if (statusFilter === status) {
      setStatusFilter(null);
      setSelectedUserIds([]);
    } else {
      setStatusFilter(status);
      const filteredUserIds = users.filter(user => user.status === status).map(user => user.id);
      setSelectedUserIds(filteredUserIds);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <Header onAddUser={handleAddUser} />
        {/* Stats Cards */}
        <StatsCards users={users} statusFilter={statusFilter} handleStatusFilter={handleStatusFilter} />
        {/* Main Content */}
        <div className='grid grid-cols-1 gap-6'>
          {/* User Table */}
          <div className='w-full'>
            <UserTable
              users={users}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
              selectedUserIds={selectedUserIds}
              onSelectUsers={setSelectedUserIds}
            />
          </div>
          {/* Calendar Grid */}
          <div className='w-full'>
            <CalendarGrid
              currentMonth={currentMonth || new Date()}
              onMonthChange={setCurrentMonth}
              users={users}
              selectedUserIds={selectedUserIds}
              onEditUser={handleEditUser}
              statusFilter={statusFilter}
            />
          </div>
          {/* Activity Log List */}
          <div className='w-full'>
            <ActivityLogList activityLogs={activityLogs} users={users} />
          </div>
        </div>
        {/* User Modal */}
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={editingUser}
          onSave={handleSaveUser}
          activityLogs={activityLogs}
        />
      </div>
    </div>
  );
}
