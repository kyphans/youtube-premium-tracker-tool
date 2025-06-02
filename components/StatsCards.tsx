import React from 'react';
import { Users } from 'lucide-react';

interface StatsCardsProps {
  users: any[];
  statusFilter: 'DONE' | 'NONE' | 'PENDING' | null;
  handleStatusFilter: (status: 'DONE' | 'NONE' | 'PENDING') => void;
}

const StatsCards: React.FC<StatsCardsProps> = ({ users, statusFilter, handleStatusFilter }) => (
  <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-6'>
    <div className='bg-white rounded-lg shadow p-6'>
      <div className='flex items-center'>
        <div className='p-2 bg-blue-100 rounded-lg'>
          <Users className='h-6 w-6 text-blue-600' />
        </div>
        <div className='ml-4'>
          <p className='text-2xl font-semibold text-gray-900'>
            {users.length}
          </p>
          <p className='text-gray-600'>Total Users</p>
        </div>
      </div>
    </div>

    <div
      className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all hover:shadow-lg ${
        statusFilter === 'DONE' ? 'ring-2 ring-blue-500 bg-blue-50' : ''
      }`}
      onClick={() => handleStatusFilter('DONE')}>
      <div className='flex items-center'>
        <div className='p-2 bg-blue-100 rounded-lg'>
          <div className='h-6 w-6 bg-blue-500 rounded'></div>
        </div>
        <div className='ml-4'>
          <p className='text-2xl font-semibold text-gray-900'>
            {users.filter((u) => u.status === 'DONE').length}
          </p>
          <p className='text-gray-600'>Active</p>
        </div>
      </div>
    </div>

    <div
      className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all hover:shadow-lg ${
        statusFilter === 'NONE' ? 'ring-2 ring-red-500 bg-red-50' : ''
      }`}
      onClick={() => handleStatusFilter('NONE')}>
      <div className='flex items-center'>
        <div className='p-2 bg-red-100 rounded-lg'>
          <div className='h-6 w-6 bg-red-500 rounded'></div>
        </div>
        <div className='ml-4'>
          <p className='text-2xl font-semibold text-gray-900'>
            {users.filter((u) => u.status === 'NONE').length}
          </p>
          <p className='text-gray-600'>Inactive</p>
        </div>
      </div>
    </div>

    <div
      className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all hover:shadow-lg ${
        statusFilter === 'PENDING'
          ? 'ring-2 ring-green-500 bg-green-50'
          : ''
      }`}
      onClick={() => handleStatusFilter('PENDING')}>
      <div className='flex items-center'>
        <div className='p-2 bg-green-100 rounded-lg'>
          <div className='h-6 w-6 bg-green-500 rounded'></div>
        </div>
        <div className='ml-4'>
          <p className='text-2xl font-semibold text-gray-900'>
            {users.filter((u) => u.status === 'PENDING').length}
          </p>
          <p className='text-gray-600'>Pending</p>
        </div>
      </div>
    </div>
  </div>
);

export default StatsCards; 